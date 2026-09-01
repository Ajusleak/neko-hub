import fs from 'node:fs';
const path = new URL('../docs/release/P4_S5G_DATABASE_ROLLBACK_DRILL_EVIDENCE.json', import.meta.url);
const e = JSON.parse(fs.readFileSync(path, 'utf8'));
const checks = {
  phase: e.phase === 'P4-S5G',
  result: e.result === 'PASS',
  mutation_verified: e.mutation_verified === true,
  reset: e.reset_from_parent_succeeded === true,
  mutation_absent: e.mutation_absent_after_reset === true,
  canonical_tables: Array.isArray(e.canonical_tables_present_after_reset) && e.canonical_tables_present_after_reset.length === 4,
  parent_untouched: e.parent_branch_untouched === true,
  branch_deleted: e.temporary_branch_deleted === true,
  bounded_scope: typeof e.scope === 'string' && e.scope.includes('does not certify application deployment rollback')
};
const failed = Object.entries(checks).filter(([,v]) => !v);
if (failed.length) {
  console.error(JSON.stringify({status:'FAIL', checks}, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({status:'PASS', checks}, null, 2));
