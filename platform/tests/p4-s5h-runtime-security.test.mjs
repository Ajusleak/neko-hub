import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const files = {
  repositories: 'packages/persistence-prisma/src/repositories.ts',
  persistenceRoute: 'apps/web-next/app/api/v1/runtime/persistence/route.js',
  readinessRoute: 'apps/web-next/app/health/ready/route.js'
};

test('P4-S5H durable runtime does not use unsafe raw SQL APIs', async () => {
  for (const file of Object.values(files)) {
    const source = await readFile(file, 'utf8');
    assert.equal(source.includes('$queryRawUnsafe'), false, `${file} must not use $queryRawUnsafe`);
    assert.equal(source.includes('$executeRawUnsafe'), false, `${file} must not use $executeRawUnsafe`);
  }
});

test('P4-S5H public diagnostics do not echo internal database errors or database identity', async () => {
  const persistence = await readFile(files.persistenceRoute, 'utf8');
  const readiness = await readFile(files.readinessRoute, 'utf8');
  assert.equal(persistence.includes('current_database()'), false);
  assert.equal(persistence.includes('current_schema()'), false);
  assert.equal(persistence.includes('error?.message'), false);
  assert.equal(readiness.includes('error?.message'), false);
  assert.match(persistence, /PERSISTENCE_RUNTIME_UNAVAILABLE/);
  assert.match(readiness, /PERSISTENCE_RUNTIME_UNAVAILABLE/);
});
