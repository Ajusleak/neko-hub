import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateDeploymentProfile } from '../infra/contracts/deployment-profile.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'apps/web/src/http-server.mjs',
  'apps/web/src/server-entry.mjs',
  'infra/staging/staging-adapters.mjs',
  'infra/staging/create-staging-runtime.mjs',
  'infra/staging/catalog-fixture.json',
  'infra/environments/local-staging.json',
  'infra/environments/local-staging.env.example',
  'infra/container/Dockerfile',
  'infra/container/docker-compose.staging.yml',
  'scripts/smoke-local-staging.mjs',
  'scripts/load-smoke-local-staging.mjs',
  'scripts/failure-recovery-local-staging.mjs',
  'docs/operations/P4_S1_LOCAL_STAGING_DEPLOYMENT.md'
];
const issues = required.filter((rel) => !existsSync(path.join(root, rel))).map((rel) => `missing: ${rel}`);
const profile = JSON.parse(await readFile(path.join(root, 'infra/environments/local-staging.json'), 'utf8'));
issues.push(...validateDeploymentProfile(profile).map((issue) => `profile: ${issue}`));
const serialized = JSON.stringify(profile.adapters);
if (!serialized.includes('local-staging')) issues.push('local staging profile must explicitly use local-staging adapters');
if (profile.environment !== 'staging') issues.push('local staging profile must use staging environment');
if (issues.length) { console.error(`NEIKOS local-staging validation FAILED (${issues.length} issues)`); for (const issue of issues) console.error(`- ${issue}`); process.exit(1); }
console.log(`NEIKOS local-staging validation PASSED (${required.length} required artifacts).`);
