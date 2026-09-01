import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

test('governance entry points exist', () => {
  assert.equal(existsSync(path.join(root, 'README.md')), true);
  assert.equal(existsSync(path.join(root, 'AGENTS.md')), true);
  assert.equal(existsSync(path.join(root, '00_ENGINEERING_INDEX.md')), true);
});

test('Priority 3 top-level domains exist', () => {
  for (const rel of ['apps', 'services', 'packages', 'infra', 'tests', 'scripts', 'docs']) {
    assert.equal(existsSync(path.join(root, rel)), true, rel);
  }
});
