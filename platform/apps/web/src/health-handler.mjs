import { livenessSnapshot } from '../../../packages/observability/src/health.mjs';

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    body: JSON.stringify(body)
  };
}

export function createHealthHandler({ readiness, releaseVersion, deploymentId }) {
  if (!readiness || typeof readiness.evaluate !== 'function') throw new TypeError('readiness registry is required');
  return async function healthHandler(pathname) {
    if (pathname === '/health/live') return json(200, livenessSnapshot({ releaseVersion, deploymentId }));
    if (pathname === '/health/ready') {
      const result = await readiness.evaluate();
      return json(result.status === 'not_ready' ? 503 : 200, result);
    }
    if (pathname === '/meta/release') return json(200, { releaseVersion, deploymentId });
    return json(404, { error: { code: 'NOT_FOUND', message: 'Route not found' } });
  };
}
