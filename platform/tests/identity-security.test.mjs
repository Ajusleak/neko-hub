import test from 'node:test';
import assert from 'node:assert/strict';
import { IdentityService, normalizeAuthContext } from '../services/identity/src/identity-service.mjs';
import { AuthorizationError, requireRole, requireScopes } from '../services/identity/src/policy.mjs';
import { redactHeaders, redactObject } from '../packages/observability/src/redaction.mjs';

test('identity normalization deduplicates and sorts scopes/roles', () => {
  assert.deepEqual(normalizeAuthContext({ method: 'bearer', subject: 'u1', scopes: ['b', 'a', 'a'], roles: ['user', 'user'] }), {
    method: 'bearer', subject: 'u1', scopes: ['a', 'b'], roles: ['user']
  });
});

test('identity service uses injected resolver and authorizes required scopes', async () => {
  const service = new IdentityService({ resolver: { resolve: async () => ({ method: 'session', subject: 'u1', scopes: ['locker:read'], roles: ['user'] }) } });
  const auth = await service.authorize({}, ['locker:read']);
  assert.equal(auth.subject, 'u1');
});

test('anonymous authorization fails as unauthorized', () => {
  assert.throws(() => requireScopes({ method: 'anonymous', scopes: [], roles: [] }, ['locker:read']), (error) => {
    assert.ok(error instanceof AuthorizationError);
    assert.equal(error.code, 'unauthorized');
    return true;
  });
});

test('missing role fails closed', () => {
  assert.throws(() => requireRole({ method: 'bearer', scopes: [], roles: ['user'] }, 'admin'), AuthorizationError);
});

test('sensitive headers and object fields are redacted', () => {
  const headers = redactHeaders({ authorization: 'Bearer abc', 'x-request-id': 'req-1', cookie: 'sid=secret' });
  assert.equal(headers.authorization, '[REDACTED]');
  assert.equal(headers.cookie, '[REDACTED]');
  assert.equal(headers['x-request-id'], 'req-1');
  const body = redactObject({ profile: { token: 'abc', name: 'n' }, apiKey: 'key' });
  assert.equal(body.profile.token, '[REDACTED]');
  assert.equal(body.apiKey, '[REDACTED]');
});
