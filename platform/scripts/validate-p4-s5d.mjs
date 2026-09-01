import fs from 'node:fs';
const required = [
  'docs/release/P4_S5D_SECURITY_PREFLIGHT.json',
  'docs/release/P4_S5D_ROLLBACK_READINESS.json',
  'docs/implementation/P4_S5D_SECURITY_ROLLBACK_PREFLIGHT.md'
];
for (const f of required) if (!fs.existsSync(f)) throw new Error(`Missing ${f}`);
const security = JSON.parse(fs.readFileSync(required[0], 'utf8'));
const rollback = JSON.parse(fs.readFileSync(required[1], 'utf8'));
if (security.passed !== true) throw new Error('Security preflight must pass');
if (security.formalSecurityReview !== 'PENDING') throw new Error('Formal security review must remain pending');
if (rollback.rollbackCandidate !== true) throw new Error('Rollback candidate evidence missing');
if (rollback.rollbackDrillExecuted !== false) throw new Error('Rollback drill must not be claimed as executed');
console.log(`P4-S5D validation PASS (${required.length} required artifacts)`);
