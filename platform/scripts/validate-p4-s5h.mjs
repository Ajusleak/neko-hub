import fs from 'node:fs';
const evidence = JSON.parse(fs.readFileSync('docs/implementation/evidence/p4-s5h-runtime-security.json', 'utf8'));
const sources = [
  fs.readFileSync('packages/persistence-prisma/src/repositories.ts', 'utf8'),
  fs.readFileSync('apps/web-next/app/api/v1/runtime/persistence/route.js', 'utf8'),
  fs.readFileSync('apps/web-next/app/health/ready/route.js', 'utf8')
].join('\n');
const checks = {
  phase: evidence.phase === 'P4-S5H',
  result: evidence.result === 'PASS',
  unsafe_removed: !sources.includes('$queryRawUnsafe') && !sources.includes('$executeRawUnsafe'),
  identity_disclosure_removed: !sources.includes('current_database()') && !sources.includes('current_schema()'),
  formal_review_pending: evidence.formal_security_review === 'PENDING',
  runtime_not_overclaimed: evidence.prisma_runtime_certification === 'BLOCKED' && evidence.next_production_build === 'NOT_EXECUTED'
};
if (Object.values(checks).some(v => !v)) {
  console.error(JSON.stringify({ status: 'FAIL', checks }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ status: 'PASS', checks }, null, 2));
