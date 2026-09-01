import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const evidencePath = 'docs/release/P4_S5A_NEON_POSTGRES_STAGING_EVIDENCE.json';
const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));

test('P4-S5A records real staging PostgreSQL provider evidence', () => {
  assert.equal(evidence.environment, 'staging');
  assert.equal(evidence.provider, 'Neon Postgres');
  assert.equal(evidence.project.name, 'neikos-hub-staging');
  assert.equal(evidence.project.database, 'neondb');
  assert.equal(evidence.certification.postgresql_reachable, true);
  assert.equal(evidence.certification.schema_executed, true);
  assert.equal(evidence.certification.durable_crud_executed, true);
  assert.equal(evidence.certification.clean_state_verified, true);
  assert.equal(evidence.crud.test_residue_remaining, 0);
});

test('P4-S5A does not falsely certify unexecuted Prisma or Next.js gates', () => {
  assert.equal(evidence.certification.prisma_runtime_certified, false);
  assert.equal(evidence.certification.nextjs_build_certified, false);
  assert.equal(evidence.prisma_cli.validate, 'NOT_EXECUTED');
  assert.equal(evidence.prisma_cli.generate, 'NOT_EXECUTED');
  assert.equal(evidence.prisma_cli.migrate_deploy, 'NOT_EXECUTED');
  assert.equal(evidence.nextjs.production_build, 'NOT_EXECUTED');
});
