import fs from 'node:fs';
import path from 'node:path';

const required = [
  'packages/persistence-prisma/prisma/migrations/migration_lock.toml',
  'packages/persistence-prisma/prisma/migrations/20260816094500_initial_durable_records/migration.sql',
  'apps/web-next/app/health/ready/route.js',
  'apps/web-next/app/api/v1/runtime/persistence/route.js',
  'scripts/postgres-e2e.mjs',
  'scripts/runtime-gate.mjs',
  'tests/p4-s3-runtime-gate.test.mjs',
  'docs/implementation/P4_S3_RUNTIME_GATE_STATUS.md'
];
const missing = required.filter((entry) => !fs.existsSync(path.resolve(entry)));
if (missing.length) {
  console.error(`P4-S3 runtime validation FAIL: missing ${missing.join(', ')}`);
  process.exit(1);
}
const migration = fs.readFileSync(required[1], 'utf8');
for (const table of ['locker_records','collection_records','wishlist_records','asset_records']) {
  if (!migration.includes(`"${table}"`)) {
    console.error(`P4-S3 runtime validation FAIL: migration missing ${table}`);
    process.exit(1);
  }
}
console.log(`P4-S3 runtime validation PASS (${required.length} required artifacts)`);
