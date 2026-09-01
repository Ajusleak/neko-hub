import test from 'node:test';
import assert from 'node:assert/strict';
import { PrismaKeyedRepository } from '../packages/persistence-prisma/src/keyed-repository.mjs';

class FakeModel {
  constructor() { this.rows = new Map(); }
  async findUnique({ where, select }) {
    const row = this.rows.get(where.id);
    if (!row) return null;
    return select ? { id: row.id } : structuredClone(row);
  }
  async findMany() { return [...this.rows.values()].sort((a, b) => a.id.localeCompare(b.id)).map((row) => structuredClone(row)); }
  async upsert({ where, create, update }) {
    const current = this.rows.get(where.id);
    const next = current ? { ...current, ...structuredClone(update) } : structuredClone(create);
    this.rows.set(where.id, next);
    return structuredClone(next);
  }
  async deleteMany({ where } = {}) {
    if (!where) { const count = this.rows.size; this.rows.clear(); return { count }; }
    const existed = this.rows.delete(where.id); return { count: existed ? 1 : 0 };
  }
}

test('PrismaKeyedRepository preserves keyed repository semantics', async () => {
  const model = new FakeModel();
  const repo = new PrismaKeyedRepository({ model });
  const input = { id: 'u1:item1', userId: 'u1', itemId: 'item1', favorite: true };
  await repo.upsert(input);
  assert.deepEqual(await repo.get(input.id), input);
  assert.equal(await repo.has(input.id), true);
  assert.deepEqual(await repo.list(), [input]);
  assert.equal(await repo.delete(input.id), true);
  assert.equal(await repo.has(input.id), false);
});

test('PrismaKeyedRepository clear removes all records', async () => {
  const repo = new PrismaKeyedRepository({ model: new FakeModel() });
  await repo.upsert({ id: 'a' });
  await repo.upsert({ id: 'b' });
  await repo.clear();
  assert.deepEqual(await repo.list(), []);
});
