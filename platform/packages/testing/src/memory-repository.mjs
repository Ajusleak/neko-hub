export class MemoryKeyedRepository {
  constructor({ keyOf = (item) => item.id } = {}) {
    this.keyOf = keyOf;
    this.items = new Map();
  }
  async get(key) { return this.items.get(key); }
  async list() { return [...this.items.values()]; }
  async upsert(item) { this.items.set(this.keyOf(item), structuredClone(item)); return item; }
  async delete(key) { return this.items.delete(key); }
  async has(key) { return this.items.has(key); }
  async clear() { this.items.clear(); }
}
