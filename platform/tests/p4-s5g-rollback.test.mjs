import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('P4-S5G rollback evidence records executed safe rollback', () => {
  const e = JSON.parse(fs.readFileSync(new URL('../docs/release/P4_S5G_DATABASE_ROLLBACK_DRILL_EVIDENCE.json', import.meta.url), 'utf8'));
  assert.equal(e.result, 'PASS');
  assert.equal(e.mutation_verified, true);
  assert.equal(e.reset_from_parent_succeeded, true);
  assert.equal(e.mutation_absent_after_reset, true);
  assert.equal(e.parent_branch_untouched, true);
  assert.equal(e.temporary_branch_deleted, true);
  assert.deepEqual([...e.canonical_tables_present_after_reset].sort(), ['asset_records','collection_records','locker_records','wishlist_records']);
  assert.match(e.scope, /does not certify application deployment rollback/);
});
