export class FortniteCatalogService {
  constructor({ provider }) {
    if (!provider || typeof provider.getItem !== 'function' || typeof provider.search !== 'function') {
      throw new TypeError('Fortnite catalog provider with getItem() and search() is required');
    }
    this.provider = provider;
  }

  async getItem(itemId) {
    if (!itemId) throw new TypeError('itemId is required');
    return this.provider.getItem(itemId);
  }

  async search(query, options = {}) {
    const text = String(query ?? '').trim();
    if (!text) return [];
    const limit = Math.min(Math.max(Number(options.limit ?? 25), 1), 100);
    return this.provider.search(text, { ...options, limit });
  }
}
