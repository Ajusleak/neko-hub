import test from 'node:test';
import assert from 'node:assert/strict';
import { validateApiResult, validateEventEnvelope } from '../packages/validation/src/contracts.mjs';

test('valid success envelope passes', () => {
  const result = validateApiResult({ ok: true, data: { value: 1 }, requestId: 'req-1', timestamp: '2026-08-14T12:00:00Z' });
  assert.equal(result.valid, true);
});

test('invalid failure envelope is rejected', () => {
  const result = validateApiResult({ ok: false, error: {}, requestId: '', timestamp: 'invalid' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.length >= 3);
});

test('event envelope requires versioned provenance fields', () => {
  const result = validateEventEnvelope({ eventId: 'evt-1', type: 'locker.item.added', version: 1, occurredAt: '2026-08-14T12:00:00Z', producer: 'locker', payload: { id: 'x' } });
  assert.equal(result.valid, true);
});
