import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/runtime-gate.yml', 'utf8');
test('external runtime workflow contains complete durable gate chain', () => {
  for (const token of ['postgres:17-alpine','runtime:install','prisma:validate','prisma:generate','prisma:migrate:deploy','e2e:postgres','build:web-next','runtime:gate']) {
    assert.match(workflow, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('runtime installer targets both dependency-bearing workspaces', () => {
  const source = fs.readFileSync('scripts/runtime-install.mjs', 'utf8');
  assert.match(source, /packages\/persistence-prisma/);
  assert.match(source, /apps\/web-next/);
});
