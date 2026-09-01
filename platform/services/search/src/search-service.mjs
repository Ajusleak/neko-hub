function score(text, query) {
  const hay = text.toLowerCase(); const needle = query.toLowerCase();
  if (hay === needle) return 100;
  if (hay.startsWith(needle)) return 80;
  if (hay.includes(needle)) return 50;
  return 0;
}

export class SearchService {
  constructor({ sources = [] } = {}) { this.sources = sources; }
  async search(query, { limit = 25 } = {}) {
    const q = String(query ?? '').trim(); if (!q) return [];
    const batches = await Promise.all(this.sources.map((source) => source.search(q, { limit })));
    const byId = new Map();
    for (const item of batches.flat()) {
      const rank = Math.max(score(item.name ?? '', q), score(item.description ?? '', q));
      const existing = byId.get(item.id);
      if (!existing || rank > existing.rank) byId.set(item.id, { ...item, rank });
    }
    return [...byId.values()].sort((a, b) => b.rank - a.rank || String(a.name).localeCompare(String(b.name))).slice(0, limit);
  }
}
