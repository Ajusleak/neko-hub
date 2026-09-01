import assert from 'node:assert/strict';

if (!process.env.DATABASE_URL) {
  console.error('BLOCKED: DATABASE_URL is required for PostgreSQL-backed E2E.');
  process.exit(2);
}

let createPrismaClient;
let createPrismaRepositories;
try {
  ({ createPrismaClient } = await import('../packages/persistence-prisma/src/client.ts'));
  ({ createPrismaRepositories } = await import('../packages/persistence-prisma/src/repositories.ts'));
} catch (error) {
  console.error(`BLOCKED: Prisma runtime is not generated/installed: ${error?.message ?? error}`);
  process.exit(2);
}

const prisma = createPrismaClient();
const marker = `e2e-${Date.now()}-${Math.random().toString(16).slice(2)}`;
try {
  await prisma.$queryRawUnsafe('SELECT 1');
  const repos = createPrismaRepositories(prisma);
  const item = { id: marker, userId: 'runtime-e2e', cosmeticId: 'cid_neikos_probe', equipped: true };
  await repos.locker.upsert(item);
  assert.deepEqual(await repos.locker.get(marker), item);
  assert.equal(await repos.locker.has(marker), true);
  assert.equal((await repos.locker.list()).some((value) => value.id === marker), true);
  assert.equal(await repos.locker.delete(marker), true);
  assert.equal(await repos.locker.has(marker), false);
  console.log('PASS: PostgreSQL-backed Prisma repository E2E CRUD completed.');
} finally {
  await prisma.lockerRecord.deleteMany({ where: { id: marker } }).catch(() => {});
  await prisma.$disconnect();
}
