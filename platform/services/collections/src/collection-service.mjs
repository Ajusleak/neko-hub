export class CollectionService {
  constructor({ repository }) { this.repository = repository; }
  key(userId, collectionId) { return `${userId}:${collectionId}`; }
  async create(userId, { id, name, description = '' }) {
    if (!userId || !id || !name) throw new TypeError('userId, id, and name are required');
    const record = { id: this.key(userId, id), collectionId: id, userId, name, description, itemIds: [], updatedAt: new Date().toISOString() };
    await this.repository.upsert(record); return record;
  }
  async addItem(userId, collectionId, itemId) {
    const key = this.key(userId, collectionId); const current = await this.repository.get(key);
    if (!current) throw new Error('collection not found');
    const itemIds = [...new Set([...current.itemIds, itemId])];
    const next = { ...current, itemIds, updatedAt: new Date().toISOString() }; await this.repository.upsert(next); return next;
  }
  async removeItem(userId, collectionId, itemId) {
    const key = this.key(userId, collectionId); const current = await this.repository.get(key);
    if (!current) throw new Error('collection not found');
    const next = { ...current, itemIds: current.itemIds.filter((id) => id !== itemId), updatedAt: new Date().toISOString() }; await this.repository.upsert(next); return next;
  }
  async list(userId) { return (await this.repository.list()).filter((r) => r.userId === userId); }
}
