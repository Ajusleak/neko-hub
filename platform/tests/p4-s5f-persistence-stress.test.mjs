import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const evidence = JSON.parse(fs.readFileSync('docs/release/P4_S5F_PERSISTENCE_STRESS_EVIDENCE.json', 'utf8'));

test('P4-S5F records complete bounded live persistence batch results', () => {
  assert.equal(evidence.batch.totalInserted, 1000);
  assert.equal(evidence.batch.totalUpdatedAndVerified, 1000);
  assert.equal(evidence.batch.totalDeleted, 1000);
  assert.equal(evidence.batch.remainingCertificationRows, 0);
  for (const repository of Object.values(evidence.repositories)) {
    assert.equal(repository.inserted, 250);
    assert.equal(repository.updatedVerified, 250);
    assert.equal(repository.remaining, 0);
  }
});

test('P4-S5F does not overclaim production load, Prisma, or deployment certification', () => {
  assert.equal(evidence.certification.productionLoadSloCertified, false);
  assert.equal(evidence.certification.prismaClientPathExercised, false);
  assert.equal(evidence.certification.exactCandidateDeployed, false);
  assert.equal(evidence.status, 'LIVE_PERSISTENCE_STRESS_SMOKE_PASS_PRISMA_RUNTIME_PENDING');
});
