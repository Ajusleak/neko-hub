import fs from 'node:fs';

const required = [
  'docs/release/P4_S5F_PERSISTENCE_STRESS_EVIDENCE.json',
  'docs/implementation/P4_S5F_PERSISTENCE_STRESS_CERTIFICATION.md'
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${file}`);
}
const evidence = JSON.parse(fs.readFileSync(required[0], 'utf8'));
if (evidence.batch.totalInserted !== 1000) throw new Error('Expected 1000 inserted rows');
if (evidence.batch.totalUpdatedAndVerified !== 1000) throw new Error('Expected 1000 verified updates');
if (evidence.batch.totalDeleted !== 1000) throw new Error('Expected 1000 deleted rows');
if (evidence.batch.remainingCertificationRows !== 0) throw new Error('Certification residue detected');
const c = evidence.certification;
if (c.liveDatabaseUsed !== true) throw new Error('Live database evidence missing');
if (c.transactionalBatchWritePassed !== true) throw new Error('Batch write gate failed');
if (c.bulkUpdateReadbackPassed !== true) throw new Error('Update/readback gate failed');
if (c.cleanupPassed !== true || c.zeroTestResidue !== true) throw new Error('Cleanup gate failed');
if (c.productionLoadSloCertified !== false) throw new Error('Must not claim production SLO certification');
if (c.prismaClientPathExercised !== false) throw new Error('Must not claim Prisma Client execution');
if (c.exactCandidateDeployed !== false) throw new Error('Must not claim exact deployment');
console.log(`P4-S5F validation PASS (${required.length} required artifacts)`);
