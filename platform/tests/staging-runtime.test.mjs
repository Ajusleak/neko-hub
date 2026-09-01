import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createLocalStagingRuntime } from '../infra/staging/create-staging-runtime.mjs';
import { createNeikosHttpServer, listen, close } from '../apps/web/src/http-server.mjs';

async function withServer(fn) {
  const runtime = await createLocalStagingRuntime();
  const server = createNeikosHttpServer({ web: runtime.services.web, readiness: runtime.readiness, releaseVersion: 'test', deploymentId: 'test' });
  const bound = await listen(server, { port: 0 });
  try { return await fn(bound.origin, runtime); } finally { await close(server); }
}

test('local staging runtime registers all production-boundary readiness names', async () => {
  const runtime = await createLocalStagingRuntime();
  const result = await runtime.readiness.evaluate();
  assert.equal(result.status, 'ready');
  assert.equal(Object.keys(result.checks).length, 7);
  assert.equal(runtime.adapters.metadata.nonProduction, true);
});

test('HTTP staging surface exposes live, ready, release metadata and search', async () => withServer(async (origin) => {
  assert.equal((await fetch(`${origin}/health/live`)).status, 200);
  assert.equal((await fetch(`${origin}/health/ready`)).status, 200);
  const meta = await (await fetch(`${origin}/meta/release`)).json(); assert.equal(meta.deploymentId, 'test');
  const home = await (await fetch(`${origin}/api/v1/home?q=Fox`)).json(); assert.ok(home.searchResults.length >= 2);
}));

test('HTTP mutation fails closed without identity and succeeds with required scopes', async () => withServer(async (origin) => {
  assert.equal((await fetch(`${origin}/api/v1/locker/cid_fox`, { method: 'POST' })).status, 401);
  const headers = { 'x-neikos-subject': 'u1', 'x-neikos-scopes': 'locker:write' };
  const created = await fetch(`${origin}/api/v1/locker/cid_fox`, { method: 'POST', headers });
  assert.equal(created.status, 201);
  const home = await (await fetch(`${origin}/api/v1/home`, { headers })).json(); assert.equal(home.lockerItems.length, 1);
}));

test('HTTP server rejects malformed JSON and oversized bodies safely', async () => withServer(async (origin) => {
  const headers = { 'x-neikos-subject': 'u1', 'x-neikos-scopes': 'wishlist:write', 'content-type': 'application/json' };
  const bad = await fetch(`${origin}/api/v1/wishlist/cid_blade`, { method: 'POST', headers, body: '{' });
  assert.equal(bad.status, 400);
  const huge = await fetch(`${origin}/api/v1/wishlist/cid_blade`, { method: 'POST', headers, body: JSON.stringify({ note: 'x'.repeat(70_000) }) });
  assert.equal(huge.status, 413);
}));


test('local staging entrypoint refuses production environment', () => {
  const env = {
    ...process.env,
    NEIKOS_ENV: 'production',
    NEIKOS_DEPLOYMENT_ID: 'prod-test',
    NEIKOS_RELEASE_VERSION: '3.0.0-test',
    NEIKOS_PUBLIC_ORIGIN: 'https://neikos.example',
    NEIKOS_IDENTITY_ADAPTER: 'identity-v1',
    NEIKOS_PERSISTENCE_ADAPTER: 'persistence-v1',
    NEIKOS_EVENTS_ADAPTER: 'events-v1',
    NEIKOS_NOTIFICATIONS_ADAPTER: 'notifications-v1',
    NEIKOS_FORTNITE_ADAPTER: 'fortnite-v1',
    NEIKOS_AI_ADAPTER: 'ai-v1',
    NEIKOS_OBSERVABILITY_ADAPTER: 'observability-v1',
    NEIKOS_REQUIRED_SECRET_REFS: ''
  };
  const result = spawnSync(process.execPath, ['apps/web/src/server-entry.mjs'], { cwd: process.cwd(), env, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(`${result.stderr}${result.stdout}`, /forbidden in production/i);
});
