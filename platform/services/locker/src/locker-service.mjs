export class LockerService {
  constructor({ repository, catalog }) {
    this.repository = repository;
    this.catalog = catalog;
  }

  key(userId, itemId) { return `${userId}:${itemId}`; }

  async add(userId, itemId, metadata = {}) {
    if (!userId || !itemId) throw new TypeError('userId and itemId are required');
    const item = this.catalog ? await this.catalog.getItem(itemId) : undefined;
    const record = {
      id: this.key(userId, itemId), userId, itemId,
      ...(item ? { item } : {}),
      favorite: Boolean(metadata.favorite),
      acquiredAt: metadata.acquiredAt,
      updatedAt: new Date().toISOString()
    };
    await this.repository.upsert(record);
    return record;
  }

  async remove(userId, itemId) { return this.repository.delete(this.key(userId, itemId)); }
  async has(userId, itemId) { return this.repository.has(this.key(userId, itemId)); }
  async list(userId) { return (await this.repository.list()).filter((r) => r.userId === userId); }
}
