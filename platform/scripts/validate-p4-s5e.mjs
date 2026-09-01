import fs from 'node:fs';

const required = [
  'docs/release/P4_S5E_SCHEMA_DRIFT_EVIDENCE.json',
  'docs/implementation/P4_S5E_SCHEMA_DRIFT_CERTIFICATION.md',
  'packages/persistence-prisma/prisma/migrations/20260816094500_initial_durable_records/migration.sql',
  'packages/persistence-prisma/prisma/schema.prisma'
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${file}`);
}
const evidence = JSON.parse(fs.readFileSync(required[0], 'utf8'));
const c = evidence.certification;
if (c.liveSchemaInspected !== true) throw new Error('Live schema inspection missing');
if (c.tableSetMatchesMigration !== true) throw new Error('Table set mismatch');
if (c.columnContractMatchesMigration !== true) throw new Error('Column contract mismatch');
if (c.primaryKeyContractMatchesMigration !== true) throw new Error('Primary-key contract mismatch');
if (c.indexContractMatchesMigration !== true) throw new Error('Index contract mismatch');
if (c.functionalSchemaDriftDetected !== false) throw new Error('Functional schema drift detected');
if (c.prismaCliValidated !== false) throw new Error('Prisma CLI must remain uncertified until executed');
if (c.exactCandidateDeployed !== false) throw new Error('Exact candidate deployment must remain uncertified');
console.log(`P4-S5E validation PASS (${required.length} required artifacts)`);
