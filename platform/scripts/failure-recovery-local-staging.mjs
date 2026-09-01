import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ReadinessRegistry } from '../packages/observability/src/health.mjs';
import { createHealthHandler } from '../apps/web/src/health-handler.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let dependencyHealthy = true;
const readiness = new ReadinessRegistry({ timeoutMs: 250 });
readiness.register('synthetic-critical-dependency', async () => ({ ok: dependencyHealthy }), { critical: true });
const health = createHealthHandler({ readiness, releaseVersion: '3.0.0-local-staging', deploymentId: 'recovery-smoke-local' });
const sequence = [];
for (const healthy of [true, false, true]) {
  dependencyHealthy = healthy;
  const result = await health('/health/ready');
  sequence.push({ dependencyHealthy: healthy, statusCode: result.statusCode, body: JSON.parse(result.body) });
}
const passed = sequence[0].statusCode === 200 && sequence[1].statusCode === 503 && sequence[2].statusCode === 200;
const evidence = { phase: 'P4-S1', scope: 'local readiness failure/recovery behavior only', sequence, passed };
await writeFile(path.join(root, 'docs/release/P4_S1_LOCAL_FAILURE_RECOVERY.json'), `${JSON.stringify(evidence, null, 2)}\n`);
if (!passed) { console.error('NEIKOS local failure-recovery smoke FAILED.'); process.exit(1); }
console.log('NEIKOS local failure-recovery smoke PASSED (ready -> not_ready -> ready).');
