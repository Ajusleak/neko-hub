import test from 'node:test';
import assert from 'node:assert/strict';
import { loadRuntimeConfig, ConfigValidationError } from '../packages/config/src/runtime-config.mjs';
import { ReadinessRegistry } from '../packages/observability/src/health.mjs';
import { assertProductionAdapters, registerAdapterReadiness, productionAdapterNames } from '../infra/contracts/adapter-contract.mjs';
import { validateDeploymentProfile } from '../infra/contracts/deployment-profile.mjs';
import { createHealthHandler } from '../apps/web/src/health-handler.mjs';

function productionEnv(overrides = {}) {
  const env = {
    NEIKOS_ENV: 'production',
    NEIKOS_DEPLOYMENT_ID: 'prod-20260816-001',
    NEIKOS_RELEASE_VERSION: '3.0.0-rc.1',
    NEIKOS_PUBLIC_ORIGIN: 'https://hub.neikos.example',
    NEIKOS_IDENTITY_ADAPTER: 'identity-approved-v1',
    NEIKOS_PERSISTENCE_ADAPTER: 'persistence-approved-v1',
    NEIKOS_EVENTS_ADAPTER: 'events-approved-v1',
    NEIKOS_NOTIFICATIONS_ADAPTER: 'notifications-approved-v1',
    NEIKOS_FORTNITE_ADAPTER: 'fortnite-authorized-v1',
    NEIKOS_AI_ADAPTER: 'ai-approved-v1',
    NEIKOS_OBSERVABILITY_ADAPTER: 'observability-approved-v1',
    NEIKOS_REQUIRED_SECRET_REFS: 'AI,FORTNITE',
    NEIKOS_AI_SECRET_REF: 'secret-manager://neikos/prod/ai',
    NEIKOS_FORTNITE_SECRET_REF: 'secret-manager://neikos/prod/fortnite',
    PORT: '8080',
    ...overrides
  };
  return env;
}

test('production runtime config requires deployment metadata, adapters, https, and secret references', () => {
  const config = loadRuntimeConfig(productionEnv());
  assert.equal(config.environment, 'production');
  assert.equal(config.port, 8080);
  assert.equal(config.adapters.identity, 'identity-approved-v1');
  assert.equal(config.secretRefs.AI, 'secret-manager://neikos/prod/ai');
});

test('production config rejects inline NEIKOS secrets', () => {
  assert.throws(
    () => loadRuntimeConfig(productionEnv({ NEIKOS_AI_TOKEN: 'do-not-inline-me' })),
    (error) => error instanceof ConfigValidationError && error.issues.some((x) => x.includes('NEIKOS_AI_TOKEN'))
  );
});

test('readiness registry fails closed on a critical adapter and degrades on noncritical check', async () => {
  const critical = new ReadinessRegistry({ timeoutMs: 100 });
  critical.register('database', async () => ({ ok: false }), { critical: true });
  assert.equal((await critical.evaluate()).status, 'not_ready');

  const degraded = new ReadinessRegistry({ timeoutMs: 100 });
  degraded.register('telemetry-export', async () => ({ ok: false }), { critical: false });
  assert.equal((await degraded.evaluate()).status, 'degraded');
});

test('production adapters require stable ids/readiness and register as critical checks', async () => {
  const adapters = Object.fromEntries(productionAdapterNames.map((name) => [name, { id: `${name}-v1`, readiness: async () => ({ ok: true }) }]));
  assert.equal(assertProductionAdapters(adapters), true);
  const registry = registerAdapterReadiness(new ReadinessRegistry(), adapters);
  const result = await registry.evaluate();
  assert.equal(result.status, 'ready');
  assert.equal(Object.keys(result.checks).length, productionAdapterNames.length);
});

test('health handler distinguishes liveness from readiness', async () => {
  const readiness = new ReadinessRegistry();
  readiness.register('database', async () => ({ ok: false }), { critical: true });
  const handler = createHealthHandler({ readiness, releaseVersion: '3.0.0-rc.1', deploymentId: 'd1' });
  assert.equal((await handler('/health/live')).statusCode, 200);
  assert.equal((await handler('/health/ready')).statusCode, 503);
});

test('deployment release profile cannot pass with pending gates/placeholders', () => {
  const profile = {
    environment: 'production', releaseVersion: '3.0.0', deploymentId: 'prod-1', publicOrigin: 'https://neikos.example',
    adapters: Object.fromEntries(productionAdapterNames.map((name) => [name, `${name}-approved-v1`])),
    secretRefs: ['secret-manager://neikos/prod/runtime'],
    gates: { securityReview: 'passed', stagingSmoke: 'passed', failureRecovery: 'passed', loadTest: 'passed', rollbackDrill: 'passed', approval: 'pending' }
  };
  const issues = validateDeploymentProfile(profile, { release: true });
  assert.ok(issues.some((x) => x.includes('approval')));
});
