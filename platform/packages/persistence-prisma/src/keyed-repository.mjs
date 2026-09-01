function clone(value) {
  return value === undefined ? undefined : structuredClone(value);
}

export class PrismaKeyedRepository {
  constructor({ model, keyOf = (item) => item.id } = {}) {
    if (!model || typeof model.upsert !== 'function' || typeof model.findUnique !== 'function' || typeof model.findMany !== 'function' || typeof model.deleteMany !== 'function') {
      throw new TypeError('Prisma model delegate with upsert/findUnique/findMany/deleteMany is required');
    }
    this.model = model;
    this.keyOf = keyOf;
  }

  async get(key) {
    const row = await this.model.findUnique({ where: { id: String(key) } });
    return row ? clone(row.payload) : undefined;
  }

  async list() {
    const rows = await this.model.findMany({ orderBy: { id: 'asc' } });
    return rows.map((row) => clone(row.payload));
  }

  async upsert(item) {
    const id = String(this.keyOf(item));
    if (!id) throw new TypeError('repository item key is required');
    const payload = clone(item);
    await this.model.upsert({
      where: { id },
      create: { id, payload },
      update: { payload }
    });
    return item;
  }

  async delete(key) {
    const result = await this.model.deleteMany({ where: { id: String(key) } });
    return Number(result?.count ?? 0) > 0;
  }

  async has(key) {
    return Boolean(await this.model.findUnique({ where: { id: String(key) }, select: { id: true } }));
  }

  async clear() {
    await this.model.deleteMany({});
  }
}
