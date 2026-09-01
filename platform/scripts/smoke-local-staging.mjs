import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { createLocalStagingRuntime } from '../infra/staging/create-staging-runtime.mjs';
import { createNeikosHttpServer, listen, close } from '../apps/web/src/http-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const startedAt = new Date().toISOString();
const started = performance.now();
const checks = [];
function record(name, ok, details = {}) { checks.push({ name, ok, details }); if (!ok) throw new Error(`Smoke check failed: ${name}`); }

const runtime = await createLocalStagingRuntime();
const server = createNeikosHttpServer({ web: runtime.services.web, readiness: runtime.readiness, releaseVersion: '3.0.0-local-staging', deploymentId: 'smoke-local' });
const bound = await listen(server, { port: 0 });
try {
  const live = await fetch(`${bound.origin}/health/live`); record('health-live', live.status === 200, { status: live.status, body: await live.json() });
  const ready = await fetch(`${bound.origin}/health/ready`); record('health-ready', ready.status === 200, { status: ready.status, body: await ready.json() });

  const anonymous = await fetch(`${bound.origin}/api/v1/home?q=Fox`); const anonymousBody = await anonymous.json();
  record('anonymous-search', anonymous.status === 200 && anonymousBody.searchResults?.length >= 2, { status: anonymous.status, resultCount: anonymousBody.searchResults?.length ?? 0 });

  const denied = await fetch(`${bound.origin}/api/v1/locker/cid_fox`, { method: 'POST' });
  record('deny-unauthenticated-mutation', denied.status === 401, { status: denied.status, body: await denied.json() });

  const headers = { 'x-neikos-subject': 'staging-user-1', 'x-neikos-scopes': 'locker:write,wishlist:write', 'content-type': 'application/json' };
  const locker = await fetch(`${bound.origin}/api/v1/locker/cid_fox`, { method: 'POST', headers });
  record('authorized-locker-write', locker.status === 201, { status: locker.status, body: await locker.json() });
  const wishlist = await fetch(`${bound.origin}/api/v1/wishlist/cid_blade`, { method: 'POST', headers, body: JSON.stringify({ priority: 'high' }) });
  record('authorized-wishlist-write', wishlist.status === 201, { status: wishlist.status, body: await wishlist.json() });
  const home = await fetch(`${bound.origin}/api/v1/home?q=Fox`, { headers }); const homeBody = await home.json();
  record('state-visible-through-facade', home.status === 200 && homeBody.lockerItems?.length === 1 && homeBody.wishlistItems?.length === 1, { status: home.status, lockerItems: homeBody.lockerItems?.length ?? 0, wishlistItems: homeBody.wishlistItems?.length ?? 0 });
} finally {
  await close(server);
}

const evidence = {
  phase: 'P4-S1',
  scope: 'local staging smoke only; not external staging or production evidence',
  startedAt,
  completedAt: new Date().toISOString(),
  durationMs: Math.round(performance.now() - started),
  checks,
  passed: checks.every((check) => check.ok)
};
await writeFile(path.join(root, 'docs/release/P4_S1_LOCAL_STAGING_SMOKE.json'), `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`NEIKOS local staging smoke PASSED (${checks.length}/${checks.length} checks).`);
