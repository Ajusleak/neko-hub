const ENVIRONMENTS = new Set(['development', 'test', 'staging', 'production']);
const REQUIRED_ADAPTER_KEYS = [
  'identity',
  'persistence',
  'events',
  'notifications',
  'fortnite',
  'ai',
  'observability'
];

export class ConfigValidationError extends Error {
  constructor(message, issues = []) {
    super(message);
    this.name = 'ConfigValidationError';
    this.code = 'CONFIG_INVALID';
    this.issues = issues;
  }
}

function required(env, key, issues) {
  const value = env[key];
  if (typeof value !== 'string' || value.trim() === '') {
    issues.push(`${key} is required`);
    return undefined;
  }
  return value.trim();
}

function parsePort(value, issues) {
  const port = Number(value ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    issues.push('PORT must be an integer between 1 and 65535');
    return 3000;
  }
  return port;
}

function parseOrigin(value, environment, issues) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (environment === 'production' && url.protocol !== 'https:') {
      issues.push('NEIKOS_PUBLIC_ORIGIN must use https in production');
    }
    return url.origin;
  } catch {
    issues.push('NEIKOS_PUBLIC_ORIGIN must be a valid absolute URL');
    return undefined;
  }
}

function parseCsv(value) {
  if (!value) return [];
  return [...new Set(String(value).split(',').map((x) => x.trim()).filter(Boolean))].sort();
}

function detectInlineSecrets(env) {
  const issues = [];
  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith('NEIKOS_') || !value) continue;
    if (key.endsWith('_SECRET_REF') || key === 'NEIKOS_REQUIRED_SECRET_REFS') continue;
    if (/(PASSWORD|SECRET|TOKEN|API_KEY|PRIVATE_KEY|CLIENT_SECRET)$/.test(key)) {
      issues.push(`${key} appears to contain an inline secret; use a *_SECRET_REF indirection instead`);
    }
  }
  return issues;
}

export function loadRuntimeConfig(env = process.env) {
  const issues = [];
  const environment = String(env.NEIKOS_ENV ?? env.NODE_ENV ?? 'development').toLowerCase();
  if (!ENVIRONMENTS.has(environment)) issues.push(`NEIKOS_ENV must be one of ${[...ENVIRONMENTS].join(', ')}`);

  const productionLike = environment === 'staging' || environment === 'production';
  const deploymentId = productionLike ? required(env, 'NEIKOS_DEPLOYMENT_ID', issues) : (env.NEIKOS_DEPLOYMENT_ID ?? 'local');
  const releaseVersion = productionLike ? required(env, 'NEIKOS_RELEASE_VERSION', issues) : (env.NEIKOS_RELEASE_VERSION ?? '0.0.0-authoring');
  const publicOrigin = productionLike
    ? parseOrigin(required(env, 'NEIKOS_PUBLIC_ORIGIN', issues), environment, issues)
    : parseOrigin(env.NEIKOS_PUBLIC_ORIGIN, environment, issues);

  const adapters = {};
  for (const key of REQUIRED_ADAPTER_KEYS) {
    const envKey = `NEIKOS_${key.toUpperCase()}_ADAPTER`;
    adapters[key] = productionLike ? required(env, envKey, issues) : (env[envKey] ?? 'memory');
  }

  const requiredSecretRefs = parseCsv(env.NEIKOS_REQUIRED_SECRET_REFS);
  const secretRefs = {};
  for (const name of requiredSecretRefs) {
    if (!/^[A-Z0-9_]+$/.test(name)) {
      issues.push(`Invalid secret reference name: ${name}`);
      continue;
    }
    const key = `NEIKOS_${name}_SECRET_REF`;
    secretRefs[name] = required(env, key, issues);
  }

  if (productionLike) issues.push(...detectInlineSecrets(env));

  const config = {
    environment,
    deploymentId,
    releaseVersion,
    publicOrigin,
    port: parsePort(env.PORT, issues),
    adapters,
    secretRefs,
    readinessTimeoutMs: Number(env.NEIKOS_READINESS_TIMEOUT_MS ?? 3000)
  };

  if (!Number.isFinite(config.readinessTimeoutMs) || config.readinessTimeoutMs < 100 || config.readinessTimeoutMs > 30000) {
    issues.push('NEIKOS_READINESS_TIMEOUT_MS must be between 100 and 30000 milliseconds');
  }

  if (issues.length) throw new ConfigValidationError('NEIKOS runtime configuration is invalid', issues);
  return Object.freeze(config);
}

export const runtimeAdapterKeys = Object.freeze([...REQUIRED_ADAPTER_KEYS]);
