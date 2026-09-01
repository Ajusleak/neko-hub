export class WishlistService {
  constructor({ repository }) { this.repository = repository; }
  key(userId, itemId) { return `${userId}:${itemId}`; }
  async add(userId, itemId, metadata = {}) {
    const record = { id: this.key(userId, itemId), userId, itemId, priority: metadata.priority ?? 'normal', note: metadata.note ?? '', updatedAt: new Date().toISOString() };
    await this.repository.upsert(record); return record;
  }
  async remove(userId, itemId) { return this.repository.delete(this.key(userId, itemId)); }
  async list(userId) { return (await this.repository.list()).filter((r) => r.userId === userId); }
}
