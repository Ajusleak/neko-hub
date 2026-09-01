import fs from 'node:fs';

const required = [
  '.github/workflows/runtime-gate.yml',
  'scripts/runtime-preflight.mjs',
  'scripts/runtime-install.mjs',
  'docs/implementation/P4_S4_EXTERNAL_RUNTIME_EXECUTION.md'
];
const missing = required.filter((f) => !fs.existsSync(f));
if (missing.length) {
  console.error(`P4-S4 validation FAIL: missing ${missing.join(', ')}`);
  process.exit(1);
}
const workflow = fs.readFileSync(required[0], 'utf8');
for (const token of ['postgres:17-alpine','prisma:validate','prisma:generate','prisma:migrate:deploy','e2e:postgres','build:web-next','runtime:gate']) {
  if (!workflow.includes(token)) {
    console.error(`P4-S4 validation FAIL: workflow missing ${token}`);
    process.exit(1);
  }
}
console.log(`P4-S4 external runtime execution validation PASS (${required.length} required artifacts)`);
