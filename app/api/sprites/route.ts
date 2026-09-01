import { SPRITE_FAMILIES, type SpriteFamily, type SpriteVariant } from "../../spriteCatalog";

const SOURCE_URL = "https://fortnite.gg/sprites";
const READER_URL = "https://r.jina.ai/http://fortnite.gg/sprites";
const VARIANT_PREFIXES = [
  "Cheat Master",
  "Holofoil",
  "Galaxy",
  "Gummy",
  "Gold",
  "Cube",
  "Quack",
  "Gem",
];
let cache: { expires: number; value: unknown } | undefined;

type LiveEntry = { name: string; image: string; infoUrl: string };

function cleanName(value: string) {
  return value.replace(/\s+Sprite$/i, "").trim();
}

function familyName(value: string) {
  const clean = cleanName(value);
  const prefix = VARIANT_PREFIXES.find((item) => clean.startsWith(`${item} `));
  return prefix ? clean.slice(prefix.length + 1) : clean;
}

function variantName(value: string) {
  const clean = cleanName(value);
  const prefix = VARIANT_PREFIXES.find((item) => clean.startsWith(`${item} `));
  return prefix || "Base";
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function absolute(value: string) {
  return new URL(value, SOURCE_URL).toString();
}

function parseMarkdown(content: string) {
  const entries: LiveEntry[] = [];
  const pattern = /\[!\[([^\]]+)\]\(([^)]+)\)\]\((https?:\/\/fortnite\.gg\/sprites\/[^)]+)\)/gi;
  for (const match of content.matchAll(pattern)) {
    entries.push({ name: cleanName(match[1]), image: absolute(match[2]), infoUrl: match[3] });
  }
  return entries;
}

function parseHtml(content: string) {
  const entries: LiveEntry[] = [];
  const pattern = /<a[^>]+href=["']([^"']*\/sprites\/[^"']+)["'][^>]*>[\s\S]*?<img([^>]+)>[\s\S]*?<\/a>/gi;
  for (const match of content.matchAll(pattern)) {
    const attrs = match[2];
    const alt = attrs.match(/alt=["']([^"']+)["']/i)?.[1];
    const image = attrs.match(/(?:src|data-src)=["']([^"']+)["']/i)?.[1];
    if (alt && image)
      entries.push({ name: cleanName(alt), image: absolute(image), infoUrl: absolute(match[1]) });
  }
  return entries;
}

function mergeCatalog(entries: LiveEntry[]) {
  const byFamily = new Map<string, LiveEntry[]>();
  for (const entry of entries) {
    const key = familyName(entry.name).toLowerCase();
    byFamily.set(key, [...(byFamily.get(key) || []), entry]);
  }

  const merged = SPRITE_FAMILIES.map((family) => {
    const base = family.name.replace(/ Sprite$/i, "").toLowerCase();
    const live = byFamily.get(base);
    if (!live?.length) return family;
    byFamily.delete(base);
    const variants: SpriteVariant[] = live.map((entry) => ({
      id: entry.infoUrl.split("/").pop() || slug(entry.name),
      name: variantName(entry.name),
      fullName: `${entry.name} Sprite`,
      image: entry.image,
      infoUrl: entry.infoUrl,
      availability: "available",
    }));
    const baseVariant = variants.find((variant) => variant.name === "Base") || variants[0];
    return { ...family, image: baseVariant.image, infoUrl: baseVariant.infoUrl, variants };
  });

  for (const live of byFamily.values()) {
    const baseEntry = live.find((entry) => variantName(entry.name) === "Base") || live[0];
    const base = familyName(baseEntry.name);
    merged.push({
      id: slug(base),
      name: `${base} Sprite`,
      element: base,
      rarity: "New",
      dropRate: "Live",
      ability: "Newly catalogued by Fortnite.GG",
      description: "Ability and level details are being synchronized from the live catalog.",
      location: "New Sprite location pending",
      accent: "#b36cff",
      image: baseEntry.image,
      infoUrl: baseEntry.infoUrl,
      variants: live.map((entry) => ({
        id: entry.infoUrl.split("/").pop() || slug(entry.name),
        name: variantName(entry.name),
        fullName: `${entry.name} Sprite`,
        image: entry.image,
        infoUrl: entry.infoUrl,
        availability: "available",
      })),
    } satisfies SpriteFamily);
  }
  return merged;
}

async function readLiveCatalog() {
  for (const url of [SOURCE_URL, READER_URL]) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/html,text/plain", "User-Agent": "NEKO-HUB/1.0" },
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) continue;
      const content = await response.text();
      const entries = url === SOURCE_URL ? parseHtml(content) : parseMarkdown(content);
      if (entries.length >= 20) return entries;
    } catch {}
  }
  return [];
}

export async function GET() {
  if (cache && cache.expires > Date.now()) return Response.json(cache.value);
  const entries = await readLiveCatalog();
  const live = entries.length > 0;
  const value = {
    data: live ? mergeCatalog(entries) : SPRITE_FAMILIES,
    source: live ? "fortnite.gg" : "built-in-fallback",
    updatedAt: new Date().toISOString(),
  };
  cache = { expires: Date.now() + 15 * 60 * 1000, value };
  return Response.json(value, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=900" },
  });
}
