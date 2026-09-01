import http from 'node:http';
import { AuthorizationError } from '../../../services/identity/src/policy.mjs';
import { createHealthHandler } from './health-handler.mjs';

function response(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
    body: JSON.stringify(body)
  };
}

function send(res, result) {
  res.writeHead(result.statusCode, result.headers);
  res.end(result.body);
}

async function readJson(req, { maxBytes = 64 * 1024 } = {}) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) {
      const error = new Error('request body too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  if (size === 0) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch {
    const error = new Error('invalid JSON request body');
    error.statusCode = 400;
    throw error;
  }
}

function requestContext(req) {
  return { headers: req.headers, method: req.method, remoteAddress: req.socket.remoteAddress };
}

function mapError(error) {
  if (error instanceof AuthorizationError) {
    return response(error.code === 'unauthorized' ? 401 : 403, { error: { code: error.code, message: error.message, missingScopes: error.missingScopes } });
  }
  return response(error?.statusCode ?? 500, { error: { code: error?.code ?? 'INTERNAL_ERROR', message: error?.statusCode ? error.message : 'Internal server error' } });
}

export function createNeikosHttpServer({ web, readiness, releaseVersion, deploymentId }) {
  if (!web) throw new TypeError('web facade is required');
  const health = createHealthHandler({ readiness, releaseVersion, deploymentId });

  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1');
      if (url.pathname.startsWith('/health/') || url.pathname === '/meta/release') {
        return send(res, await health(url.pathname));
      }
      if (req.method === 'GET' && url.pathname === '/api/v1/home') {
        return send(res, response(200, await web.home(requestContext(req), { query: url.searchParams.get('q') ?? '' })));
      }
      const lockerMatch = url.pathname.match(/^\/api\/v1\/locker\/([^/]+)$/);
      if (req.method === 'POST' && lockerMatch) {
        return send(res, response(201, await web.addLockerItem(requestContext(req), decodeURIComponent(lockerMatch[1]))));
      }
      const wishlistMatch = url.pathname.match(/^\/api\/v1\/wishlist\/([^/]+)$/);
      if (req.method === 'POST' && wishlistMatch) {
        const body = await readJson(req);
        return send(res, response(201, await web.addWishlistItem(requestContext(req), decodeURIComponent(wishlistMatch[1]), body)));
      }
      return send(res, response(404, { error: { code: 'NOT_FOUND', message: 'Route not found' } }));
    } catch (error) {
      return send(res, mapError(error));
    }
  });
}

export async function listen(server, { host = '127.0.0.1', port = 0 } = {}) {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => { server.off('error', reject); resolve(); });
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('server did not bind to a TCP address');
  return { host: address.address, port: address.port, origin: `http://${host}:${address.port}` };
}

export async function close(server) {
  if (!server.listening) return;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
