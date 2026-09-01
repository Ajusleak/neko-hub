import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const evidence = JSON.parse(fs.readFileSync('docs/release/P4_S5E_SCHEMA_DRIFT_EVIDENCE.json', 'utf8'));

test('P4-S5E records an exact live database contract match', () => {
  assert.equal(evidence.observed.tables, 4);
  assert.equal(evidence.observed.columns, 12);
  assert.equal(evidence.observed.primaryKeys, 4);
  assert.equal(evidence.observed.primaryKeyIndexes, 4);
  assert.equal(evidence.observed.unexpectedIndexes, 0);
  assert.equal(evidence.certification.functionalSchemaDriftDetected, false);
});

test('P4-S5E keeps Prisma runtime and exact deployment gates separate', () => {
  assert.equal(evidence.certification.prismaCliValidated, false);
  assert.equal(evidence.certification.exactCandidateDeployed, false);
  assert.equal(evidence.status, 'LIVE_SCHEMA_MATCH_CONFIRMED_PRISMA_RUNTIME_PENDING');
});
