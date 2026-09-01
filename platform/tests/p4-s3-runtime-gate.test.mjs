import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();

test('P4-S3 includes a PostgreSQL migration matching all durable record tables', () => {
  const migrationRoot = path.join(root, 'packages/persistence-prisma/prisma/migrations');
  const migrations = fs.readdirSync(migrationRoot).filter((name) => /^\d+_/.test(name));
  assert.ok(migrations.length >= 1);
  const sql = fs.readFileSync(path.join(migrationRoot, migrations.at(-1), 'migration.sql'), 'utf8');
  for (const table of ['locker_records', 'collection_records', 'wishlist_records', 'asset_records']) {
    assert.match(sql, new RegExp(`CREATE TABLE IF NOT EXISTS "${table}"`));
  }
  assert.match(sql, /JSONB NOT NULL/);
});

test('P4-S3 runtime gate records external blockers without manufacturing passes', () => {
  const source = fs.readFileSync(path.join(root, 'scripts/runtime-gate.mjs'), 'utf8');
  assert.match(source, /DEPENDENCIES_NOT_INSTALLED/);
  assert.match(source, /DATABASE_URL_NOT_CONFIGURED/);
  assert.match(source, /prisma_migrate_deploy/);
  assert.match(source, /next_production_build/);
  assert.match(source, /postgres_e2e/);
});

test('Next readiness fails closed when DATABASE_URL is absent', async () => {
  const prior = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  try {
    const mod = await import(pathToFileURL(path.join(root, 'apps/web-next/app/health/ready/route.js')).href + `?t=${Date.now()}`);
    const response = await mod.GET();
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.status, 'not_ready');
    assert.equal(body.checks.persistence.reason, 'DATABASE_URL_NOT_CONFIGURED');
  } finally {
    if (prior === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = prior;
  }
});

test('Durable persistence API fails closed when DATABASE_URL is absent', async () => {
  const prior = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  try {
    const mod = await import(pathToFileURL(path.join(root, 'apps/web-next/app/api/v1/runtime/persistence/route.js')).href + `?t=${Date.now()}`);
    const response = await mod.GET();
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.deepEqual(body, { ok: false, code: 'DATABASE_URL_NOT_CONFIGURED' });
  } finally {
    if (prior === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = prior;
  }
});
