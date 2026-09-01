import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { validateDeploymentProfile } from '../infra/contracts/deployment-profile.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);
const profileFlag = args.indexOf('--profile');
const releaseMode = args.includes('--release');
const profilePath = profileFlag >= 0 ? args[profileFlag + 1] : null;

const requiredReadinessFiles = [
  'infra/contracts/adapter-contract.mjs',
  'infra/contracts/deployment-profile.mjs',
  'infra/contracts/deployment-profile.schema.json',
  'infra/environments/staging.example.json',
  'infra/environments/production.example.json',
  'docs/operations/P3_I12_PRODUCTION_READINESS.md',
  'docs/operations/DEPLOYMENT_RUNBOOK.md',
  'docs/operations/ROLLBACK_RUNBOOK.md',
  'docs/security/P3_I12_SECURITY_REVIEW_CHECKLIST.md',
  'docs/release/P3_I12_LOCAL_VALIDATION_EVIDENCE.md',
  'packages/config/src/runtime-config.mjs',
  'packages/observability/src/health.mjs',
  'apps/web/src/health-handler.mjs'
];

const issues = [];
for (const rel of requiredReadinessFiles) {
  if (!existsSync(path.join(root, rel))) issues.push(`missing readiness artifact: ${rel}`);
}

const status = JSON.parse(await readFile(path.join(root, 'implementation-status.json'), 'utf8'));
for (let i = 1; i <= 11; i += 1) {
  const key = `P3-I${i}`;
  if (!String(status.workItems?.[key] ?? '').includes('implemented') && !String(status.workItems?.[key] ?? '').includes('core-implemented')) {
    issues.push(`${key} is not represented as implemented before production readiness`);
  }
}

if (releaseMode && !profilePath) issues.push('--release requires --profile <deployment-profile.json>');
if (profilePath) {
  const resolved = path.resolve(process.cwd(), profilePath);
  if (!existsSync(resolved)) {
    issues.push(`deployment profile not found: ${resolved}`);
  } else {
    const profile = JSON.parse(await readFile(resolved, 'utf8'));
    issues.push(...validateDeploymentProfile(profile, { release: releaseMode }).map((x) => `profile: ${x}`));
  }
}

if (issues.length) {
  console.error(`NEIKOS production-readiness validation FAILED (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}
console.log(`NEIKOS production-readiness validation PASSED (${releaseMode ? 'release gate' : 'local readiness artifacts'}).`);
