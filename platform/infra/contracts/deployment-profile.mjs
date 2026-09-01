import { productionAdapterNames } from './adapter-contract.mjs';

const GATE_NAMES = ['securityReview', 'stagingSmoke', 'failureRecovery', 'loadTest', 'rollbackDrill', 'approval'];
const PLACEHOLDER = /REPLACE_|example\.invalid/i;

export function validateDeploymentProfile(profile, { release = false } = {}) {
  const issues = [];
  if (!profile || typeof profile !== 'object') return ['profile must be an object'];
  if (!['staging', 'production'].includes(profile.environment)) issues.push('environment must be staging or production');
  for (const key of ['releaseVersion', 'deploymentId', 'publicOrigin']) {
    if (typeof profile[key] !== 'string' || !profile[key].trim()) issues.push(`${key} is required`);
  }
  try {
    const url = new URL(profile.publicOrigin);
    if (profile.environment === 'production' && url.protocol !== 'https:') issues.push('production publicOrigin must use https');
  } catch {
    issues.push('publicOrigin must be a valid URL');
  }

  for (const name of productionAdapterNames) {
    if (typeof profile.adapters?.[name] !== 'string' || !profile.adapters[name].trim()) issues.push(`adapter ${name} is required`);
  }
  if (!Array.isArray(profile.secretRefs)) issues.push('secretRefs must be an array of secret-manager references');
  for (const gate of GATE_NAMES) {
    if (!['pending', 'passed'].includes(profile.gates?.[gate])) issues.push(`gate ${gate} must be pending or passed`);
  }

  if (release) {
    const serialized = JSON.stringify(profile);
    if (PLACEHOLDER.test(serialized)) issues.push('release profile still contains placeholders/example.invalid');
    if (!profile.secretRefs?.length) issues.push('release profile must declare at least one secret-manager reference when provider credentials are required');
    for (const gate of GATE_NAMES) {
      if (profile.gates?.[gate] !== 'passed') issues.push(`release gate ${gate} has not passed`);
    }
  }
  return issues;
}

export const deploymentGateNames = Object.freeze([...GATE_NAMES]);
