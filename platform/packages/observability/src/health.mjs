function withTimeout(promise, timeoutMs, name) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${name} readiness check timed out`)), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export class ReadinessRegistry {
  constructor({ timeoutMs = 3000, now = () => Date.now() } = {}) {
    this.timeoutMs = timeoutMs;
    this.now = now;
    this.checks = new Map();
  }

  register(name, check, { critical = true } = {}) {
    if (!name || typeof check !== 'function') throw new TypeError('Readiness check requires name and function');
    if (this.checks.has(name)) throw new Error(`Duplicate readiness check: ${name}`);
    this.checks.set(name, { check, critical });
    return this;
  }

  async evaluate() {
    const results = {};
    let criticalFailure = false;
    let nonCriticalFailure = false;

    await Promise.all([...this.checks.entries()].map(async ([name, entry]) => {
      const started = this.now();
      try {
        const raw = await withTimeout(Promise.resolve(entry.check()), this.timeoutMs, name);
        const ok = raw === true || raw?.ok === true;
        results[name] = {
          ok,
          critical: entry.critical,
          durationMs: Math.max(0, this.now() - started),
          ...(raw && typeof raw === 'object' && raw.details !== undefined ? { details: raw.details } : {})
        };
        if (!ok) entry.critical ? criticalFailure = true : nonCriticalFailure = true;
      } catch (error) {
        results[name] = {
          ok: false,
          critical: entry.critical,
          durationMs: Math.max(0, this.now() - started),
          error: error instanceof Error ? error.message : String(error)
        };
        entry.critical ? criticalFailure = true : nonCriticalFailure = true;
      }
    }));

    return {
      status: criticalFailure ? 'not_ready' : nonCriticalFailure ? 'degraded' : 'ready',
      checks: results
    };
  }
}

export function livenessSnapshot({ releaseVersion = 'unknown', deploymentId = 'unknown' } = {}) {
  return { status: 'live', releaseVersion, deploymentId };
}
