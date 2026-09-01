import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('P4-S5D security preflight passes without claiming formal approval', () => {
  const e = JSON.parse(fs.readFileSync('docs/release/P4_S5D_SECURITY_PREFLIGHT.json', 'utf8'));
  assert.equal(e.passed, true);
  assert.equal(e.formalSecurityReview, 'PENDING');
});

test('P4-S5D rollback evidence distinguishes readiness from executed drill', () => {
  const e = JSON.parse(fs.readFileSync('docs/release/P4_S5D_ROLLBACK_READINESS.json', 'utf8'));
  assert.equal(e.rollbackCandidate, true);
  assert.equal(e.rollbackDrillExecuted, false);
  assert.equal(e.status, 'READY_FOR_DRILL');
});
