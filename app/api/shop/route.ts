const ENDPOINT = "https://fortnite-api.com/v2/shop?language=en";
const OFFICIAL_SHOP_READER =
  "https://r.jina.ai/http://www.fortnite.com/item-shop?lang=en-US";
type ShopEntry = {
  offerId?: string;
  regularPrice?: number;
  finalPrice?: number;
  giftable?: boolean;
  inDate?: string;
  outDate?: string;
  layout?: {
    name?: string;
    category?: string;
    rank?: number;
    useWidePreview?: boolean;
  };
  colors?: { color1?: string; color2?: string; color3?: string };
  bundle?: { name?: string; info?: string; image?: string };
  newDisplayAsset?: { renderImages?: Array<{ image?: string }> };
  brItems?: Array<{
    name?: string;
    description?: string;
    type?: { displayValue?: string };
    rarity?: { displayValue?: string };
    images?: { featured?: string; icon?: string };
  }>;
  cars?: Array<{
    name?: string;
    description?: string;
    type?: { displayValue?: string };
    rarity?: { displayValue?: string };
    images?: { featured?: string; large?: string; small?: string; icon?: string };
  }>;
  tracks?: Array<{ title?: string; artist?: string; albumArt?: string }>;
  instruments?: Array<{
    name?: string;
    images?: { large?: string; small?: string };
  }>;
};
let cache: { expires: number; value: unknown } | undefined;
function first<T>(values: T[] | undefined) {
  return values?.[0];
}
function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
async function officialShopLinks() {
  const links = new Map<string, string>();
  try {
    const response = await fetch(OFFICIAL_SHOP_READER, {
      headers: { Accept: "text/plain", "User-Agent": "NEKO-HUB/1.0" },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return links;
    const content = await response.text();
    const matches = content.matchAll(
      /https?:\/\/www\.fortnite\.com\/(item-shop\/[a-z-]+\/[^\s\])?]+)/gi,
    );
    for (const match of matches) {
      const path = match[1].replace(/[?#].*$/, "");
      const product = path.split("/").pop() || "";
      const nameSlug = product.replace(/-[a-f0-9]{8,16}$/i, "");
      if (nameSlug)
        links.set(
          nameSlug,
          `https://www.fortnite.com/${path}`,
        );
    }
  } catch {}
  return links;
}
function map(entry: ShopEntry, officialLinks: Map<string, string>) {
  const br = first(entry.brItems),
    car = first(entry.cars),
    track = first(entry.tracks),
    instrument = first(entry.instruments);
  const name =
    entry.bundle?.name ||
    br?.name ||
    car?.name ||
    track?.title ||
    instrument?.name ||
    "Fortnite offer";
  const image =
    entry.bundle?.image ||
    first(entry.newDisplayAsset?.renderImages)?.image ||
    br?.images?.featured ||
    br?.images?.icon ||
    car?.images?.featured ||
    car?.images?.large ||
    car?.images?.small ||
    car?.images?.icon ||
    track?.albumArt ||
    instrument?.images?.large ||
    instrument?.images?.small ||
    "";
  const typeName =
    br?.type?.displayValue?.toLowerCase() ||
    car?.type?.displayValue?.toLowerCase() ||
    "";
  const sectionName = (
    entry.layout?.name ||
    entry.layout?.category ||
    "Featured"
  ).toLowerCase();
  const isMusic = Boolean(
    track ||
      instrument ||
      /jam|track|music|festival|instrument/.test(sectionName),
  );
  const isVehicle =
    !isMusic &&
    Boolean(
      entry.cars?.length ||
        /car|vehicle|wheel|decal|rocket|racing|octane|suv/.test(
          `${sectionName} ${typeName}`,
        ),
    );
  const sectionPriority = isMusic ? 30 : isVehicle ? 20 : 0;
  const sortPriority = entry.bundle
    ? 0
    : typeName.includes("outfit")
      ? 1
      : br
        ? 2
        : instrument
          ? 4
          : track || sectionName.includes("jam track")
            ? 6
            : 5;
  return {
    id: entry.offerId || crypto.randomUUID(),
    name,
    subtitle:
      entry.bundle?.info ||
      br?.description ||
      car?.description ||
      track?.artist ||
      br?.type?.displayValue ||
      car?.type?.displayValue ||
      "Item Shop offer",
    image,
    price: entry.finalPrice || 0,
    regularPrice: entry.regularPrice || 0,
    section: entry.layout?.name || entry.layout?.category || "Featured",
    sectionRank: entry.layout?.rank ?? 9999,
    sectionPriority,
    isBundle: Boolean(entry.bundle),
    isNew: Boolean(
      entry.inDate &&
        Date.now() - Date.parse(entry.inDate) < 1000 * 60 * 60 * 48,
    ),
    sortPriority,
    rarity: br?.rarity?.displayValue || car?.rarity?.displayValue || "Shop",
    itemCount:
      entry.brItems?.length ||
      entry.cars?.length ||
      entry.tracks?.length ||
      entry.instruments?.length ||
      1,
    giftable: Boolean(entry.giftable),
    wide: Boolean(entry.layout?.useWidePreview),
    colors: entry.colors,
    outDate: entry.outDate || null,
    officialUrl: officialLinks.get(slugify(name)) || null,
  };
}
export async function GET() {
  try {
    if (cache && cache.expires > Date.now())
      return Response.json(cache.value, {
        headers: { "Cache-Control": "public, max-age=120" },
      });
    const [response, officialLinks] = await Promise.all([
      fetch(ENDPOINT, {
        headers: { Accept: "application/json", "User-Agent": "NEKO-HUB/1.0" },
        signal: AbortSignal.timeout(25000),
      }),
      officialShopLinks(),
    ]);
    if (!response.ok)
      throw new Error(`Fortnite-API returned ${response.status}`);
    const payload = (await response.json()) as {
      status?: number;
      data?: { date?: string; entries?: ShopEntry[] };
    };
    if (payload.status !== 200 || !Array.isArray(payload.data?.entries))
      throw new Error("Invalid Item Shop payload");
    const entries = payload.data.entries
      .map((entry) => map(entry, officialLinks))
      .filter((item) => item.image)
      .sort(
        (a, b) =>
          a.sortPriority - b.sortPriority ||
          a.sectionRank - b.sectionRank ||
          Number(b.isBundle) - Number(a.isBundle) ||
          a.name.localeCompare(b.name),
      );
    const sections = [...new Set(entries.map((item) => item.section))];
    const value = {
      date: payload.data.date,
      entries,
      sections,
      source: "fortnite-api",
    };
    cache = { expires: Date.now() + 300000, value };
    return Response.json(value, {
      headers: {
        "Cache-Control": "public, max-age=120, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Item Shop is temporarily unavailable.",
      },
      { status: 502 },
    );
  }
}
