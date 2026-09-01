import { loadRuntimeConfig } from '../../../packages/config/src/runtime-config.mjs';
import { createLocalStagingRuntime } from '../../../infra/staging/create-staging-runtime.mjs';
import { createNeikosHttpServer, listen } from './http-server.mjs';

const config = loadRuntimeConfig(process.env);
if (config.environment === 'production') {
  throw new Error('The local-staging runtime is forbidden in production. Bind approved production adapters instead.');
}
const runtime = await createLocalStagingRuntime({ readinessTimeoutMs: config.readinessTimeoutMs });
const server = createNeikosHttpServer({
  web: runtime.services.web,
  readiness: runtime.readiness,
  releaseVersion: config.releaseVersion,
  deploymentId: config.deploymentId
});
const bound = await listen(server, { host: process.env.HOST ?? '0.0.0.0', port: config.port });
console.log(JSON.stringify({ event: 'neikos.staging.started', environment: config.environment, deploymentId: config.deploymentId, releaseVersion: config.releaseVersion, port: bound.port }));

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
