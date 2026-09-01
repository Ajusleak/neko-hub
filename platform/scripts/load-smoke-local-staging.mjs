import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { createLocalStagingRuntime } from '../infra/staging/create-staging-runtime.mjs';
import { createNeikosHttpServer, listen, close } from '../apps/web/src/http-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const totalRequests = Number(process.env.NEIKOS_LOCAL_LOAD_REQUESTS ?? 200);
const concurrency = Number(process.env.NEIKOS_LOCAL_LOAD_CONCURRENCY ?? 20);
if (!Number.isInteger(totalRequests) || totalRequests < 1 || totalRequests > 5000) throw new Error('NEIKOS_LOCAL_LOAD_REQUESTS must be 1..5000');
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 200) throw new Error('NEIKOS_LOCAL_LOAD_CONCURRENCY must be 1..200');

const runtime = await createLocalStagingRuntime();
const server = createNeikosHttpServer({ web: runtime.services.web, readiness: runtime.readiness, releaseVersion: '3.0.0-local-staging', deploymentId: 'load-smoke-local' });
const bound = await listen(server, { port: 0 });
const latencies = [];
let failures = 0;
let next = 0;
const started = performance.now();
async function worker() {
  while (true) {
    const index = next++;
    if (index >= totalRequests) return;
    const t0 = performance.now();
    try {
      const pathName = index % 2 === 0 ? '/health/ready' : '/api/v1/home?q=Fox';
      const res = await fetch(`${bound.origin}${pathName}`);
      if (!res.ok) failures += 1;
      await res.arrayBuffer();
    } catch { failures += 1; }
    latencies.push(performance.now() - t0);
  }
}
try { await Promise.all(Array.from({ length: Math.min(concurrency, totalRequests) }, worker)); }
finally { await close(server); }
latencies.sort((a, b) => a - b);
const percentile = (p) => latencies[Math.min(latencies.length - 1, Math.floor((latencies.length - 1) * p))] ?? 0;
const elapsedMs = performance.now() - started;
const evidence = {
  phase: 'P4-S1',
  scope: 'local process load smoke only; not capacity planning or production load-test evidence',
  totalRequests,
  concurrency,
  failures,
  durationMs: Math.round(elapsedMs),
  requestsPerSecond: Number((totalRequests / (elapsedMs / 1000)).toFixed(2)),
  latencyMs: { p50: Number(percentile(0.50).toFixed(2)), p95: Number(percentile(0.95).toFixed(2)), p99: Number(percentile(0.99).toFixed(2)), max: Number((latencies.at(-1) ?? 0).toFixed(2)) },
  passed: failures === 0
};
await writeFile(path.join(root, 'docs/release/P4_S1_LOCAL_LOAD_SMOKE.json'), `${JSON.stringify(evidence, null, 2)}\n`);
if (failures) { console.error(`NEIKOS local load smoke FAILED (${failures}/${totalRequests} failed).`); process.exit(1); }
console.log(`NEIKOS local load smoke PASSED (${totalRequests} requests, ${evidence.requestsPerSecond} req/s, p95 ${evidence.latencyMs.p95} ms).`);
