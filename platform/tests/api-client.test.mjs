import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { NeikosApiClient, ApiClientError } from '../packages/api-client/src/client.mjs';

async function withServer(handler, fn) {
  const server = http.createServer(handler);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  try {
    await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    server.close();
    await once(server, 'close');
  }
}

test('client propagates auth and request id and returns validated data', async () => {
  await withServer((req, res) => {
    assert.equal(req.headers.authorization, 'Bearer test-token');
    assert.ok(req.headers['x-request-id']);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ ok: true, data: { pong: true }, requestId: req.headers['x-request-id'], timestamp: new Date().toISOString() }));
  }, async (baseUrl) => {
    const client = new NeikosApiClient({ baseUrl, tokenProvider: () => 'test-token' });
    const result = await client.request('/ping');
    assert.deepEqual(result.data, { pong: true });
  });
});

test('client converts NEIKOS failure envelope into ApiClientError', async () => {
  await withServer((req, res) => {
    res.statusCode = 404;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: { code: 'not_found', message: 'missing', retryable: false }, requestId: 'req-404', timestamp: new Date().toISOString() }));
  }, async (baseUrl) => {
    const client = new NeikosApiClient({ baseUrl });
    await assert.rejects(() => client.request('/missing'), (error) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'not_found');
      return true;
    });
  });
});
