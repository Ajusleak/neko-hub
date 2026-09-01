import fs from 'node:fs';

const required = [
  'docs/implementation/P4_S5A_PERSISTENCE_PROVIDER_CERTIFICATION.md',
  'docs/release/P4_S5A_NEON_POSTGRES_STAGING_EVIDENCE.json',
  'tests/p4-s5a-persistence-certification.test.mjs'
];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`P4-S5A validation FAIL: missing ${missing.join(', ')}`);
  process.exit(1);
}
const evidence = JSON.parse(fs.readFileSync(required[1], 'utf8'));
for (const key of ['postgresql_reachable','schema_executed','durable_crud_executed','clean_state_verified']) {
  if (evidence.certification?.[key] !== true) {
    console.error(`P4-S5A validation FAIL: certification.${key} is not true`);
    process.exit(1);
  }
}
if (evidence.certification?.prisma_runtime_certified !== false || evidence.certification?.nextjs_build_certified !== false) {
  console.error('P4-S5A validation FAIL: unexecuted runtime gates must remain false');
  process.exit(1);
}
console.log(`P4-S5A persistence certification validation PASS (${required.length} required artifacts)`);
