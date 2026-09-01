const ENDPOINT = "https://fortnite-api.com/v2/cosmetics/br?language=en";
const TYPES: Record<string, string[]> = {
  outfit: ["athenacharacter", "outfit"],
  backbling: ["athenabackpack", "back bling"],
  pickaxe: ["athenapickaxe", "harvesting tool", "pickaxe"],
  glider: ["athenaglider", "glider"],
  emote: ["athenadance", "emote"],
  wrap: ["athenaitemwrap", "wrap"],
  contrail: ["athenaskydivetrail", "contrail"],
  music: ["athenamusicpack", "music"],
  loadingscreen: ["athenaloadingscreen", "loading screen"],
};
type FortniteItem = {
  id?: string;
  name?: string;
  description?: string;
  added?: string;
  type?: { id?: string; name?: string; value?: string; displayValue?: string; backendValue?: string } | null;
  rarity?: { id?: string; name?: string; value?: string; displayValue?: string } | null;
  series?: { id?: string; name?: string; value?: string } | null;
  set?: { id?: string; name?: string; value?: string } | null;
  introduction?: {
    id?: number;
    name?: string;
    chapter?: string;
    season?: string;
  } | null;
  images?: { featured?: string; icon?: string; smallIcon?: string } | null;
};
type FallbackItem = {
  id?: string;
  name?: string;
  description?: string;
  added?: string;
  type?: { value?: string; displayValue?: string; backendValue?: string };
  rarity?: { displayValue?: string };
  series?: { value?: string } | null;
  set?: { value?: string } | null;
  images?: { featured?: string; icon?: string; smallIcon?: string };
};
let cache: { expires: number; items: FortniteItem[] } | undefined;
function shuffle<T>(values: T[]) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
async function catalog() {
  if (cache && cache.expires > Date.now()) return cache.items;
  const response = await fetch(ENDPOINT, {
    headers: { Accept: "application/json", "User-Agent": "NEKO-HUB/1.0" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok)
    throw new Error(`Fortnite-API returned ${response.status}`);
  const payload = (await response.json()) as { data?: FortniteItem[] };
  if (!Array.isArray(payload.data))
    throw new Error("Invalid Fortnite-API payload");
  cache = { expires: Date.now() + 900000, items: payload.data };
  return cache.items;
}
function matchesType(item: FortniteItem, category: string) {
  const accepted = TYPES[category];
  if (!accepted) return false;
  const value = `${item.type?.id || ""} ${item.type?.name || ""} ${item.type?.value || ""} ${item.type?.displayValue || ""} ${item.type?.backendValue || ""}`.toLowerCase();
  return accepted.some((type) => value.includes(type));
}
function normalize(item: FortniteItem) {
  const raw = item.rarity?.displayValue || item.rarity?.name || item.rarity?.value || "Uncommon",
    allowed = ["Uncommon", "Rare", "Epic", "Legendary", "Icon"];
  return {
    id: item.id!,
    name: item.name!,
    type: item.type?.displayValue || item.type?.name || item.type?.value || "Cosmetic",
    rarity: allowed.includes(raw) ? raw : item.series ? "Icon" : "Epic",
    series: item.series?.value || item.series?.name,
    set: item.set?.value || item.set?.name || "Independent cosmetic",
    price: 0,
    image: item.images?.featured || item.images?.icon || item.images?.smallIcon || "",
    trend: 0,
    isNew: item.added ? Date.now() - Date.parse(item.added) < 2592000000 : false,
    shopStatus:
      item.description?.trim() ||
      item.introduction?.name ||
      "Fortnite cosmetic",
  };
}
function normalizeFallback(item: FallbackItem) {
  const raw = item.rarity?.displayValue || "Epic";
  return {
    id: item.id!,
    name: item.name!,
    type: item.type?.displayValue || "Cosmetic",
    rarity: raw.includes("Legendary")
      ? "Legendary"
      : raw.includes("Rare")
        ? "Rare"
        : raw.includes("Uncommon")
          ? "Uncommon"
          : raw.includes("Icon") || raw.includes("Gaming")
            ? "Icon"
            : "Epic",
    series: item.series?.value,
    set: item.set?.value || "Independent cosmetic",
    price: 0,
    image:
      item.images?.featured ||
      item.images?.icon ||
      item.images?.smallIcon ||
      "",
    trend: 0,
    isNew: item.added
      ? Date.now() - Date.parse(item.added) < 2592000000
      : false,
    shopStatus: item.description?.trim() || "Fortnite cosmetic",
  };
}
async function fallbackSearch(query: string, category: string) {
  const target = new URL("https://fortnite-api.com/v2/cosmetics/br/search/all");
  target.search = new URLSearchParams({
    name: query,
    matchMethod: "contains",
    language: "en",
  }).toString();
  const response = await fetch(target, {
    headers: { Accept: "application/json", "User-Agent": "NEKO-HUB/1.0" },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) return [];
  const payload = (await response.json()) as { data?: FallbackItem[] };
  let items = Array.isArray(payload.data) ? payload.data : [];
  if (category !== "mixed") {
    const accepted = TYPES[category] || [];
    items = items.filter((item) =>
      accepted.some((type) =>
        `${item.type?.value || ""} ${item.type?.displayValue || ""} ${item.type?.backendValue || ""}`
          .toLowerCase()
          .includes(type),
      ),
    );
  }
  return items
    .filter(
      (item) =>
        item.id &&
        item.name &&
        (item.images?.featured || item.images?.icon || item.images?.smallIcon),
    )
    .map(normalizeFallback);
}
export async function GET(request: Request) {
  try {
    const url = new URL(request.url),
      category = (url.searchParams.get("type") || "mixed")
        .replace(/[^a-z]/g, "")
        .toLowerCase(),
      query = (url.searchParams.get("q") || "").trim().toLowerCase(),
      limit = Math.min(
        72,
        Math.max(12, Number(url.searchParams.get("limit")) || 48),
      );
    const all = (await catalog()).filter(
      (item) =>
        item.id && item.name && (item.images?.featured || item.images?.icon || item.images?.smallIcon),
    );
    let filtered =
      category === "mixed"
        ? all
        : all.filter((item) => matchesType(item, category));
    if (query)
      filtered = filtered.filter((item) =>
        `${item.name} ${item.description} ${item.type?.displayValue || item.type?.name || item.type?.value} ${item.rarity?.displayValue || item.rarity?.name || item.rarity?.value} ${item.series?.value || item.series?.name} ${item.set?.value || item.set?.name}`
          .toLowerCase()
          .includes(query),
      );
    if (query && filtered.length === 0) {
      const fallback = await fallbackSearch(query, category);
      if (fallback.length) {
        return Response.json(
          {
            data: fallback.slice(0, limit),
            total: fallback.length,
            category,
            source: "fortniteapi.com+live-fallback",
          },
          {
            headers: {
              "Cache-Control":
                "public, max-age=120, stale-while-revalidate=600",
            },
          },
        );
      }
    }
    const total = filtered.length;
    const selected =
      category === "mixed"
        ? shuffle(filtered).slice(0, limit)
        : filtered
            .sort(
              (a, b) => Date.parse(b.added || "") - Date.parse(a.added || ""),
            )
            .slice(0, limit);
    return Response.json(
      {
        data: selected.map(normalize),
        total,
        category,
        source: "fortnite-api.com/v2/cosmetics/br",
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=900",
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Cosmetics are temporarily unavailable.",
      },
      { status: 502 },
    );
  }
}
