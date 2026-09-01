export const productionAdapterNames = Object.freeze([
  'identity',
  'persistence',
  'events',
  'notifications',
  'fortnite',
  'ai',
  'observability'
]);

export function assertProductionAdapters(adapters) {
  const issues = [];
  for (const name of productionAdapterNames) {
    const adapter = adapters?.[name];
    if (!adapter) {
      issues.push(`missing adapter: ${name}`);
      continue;
    }
    if (typeof adapter.id !== 'string' || !adapter.id.trim()) issues.push(`${name} adapter requires a stable id`);
    if (typeof adapter.readiness !== 'function') issues.push(`${name} adapter requires readiness()`);
  }
  if (issues.length) {
    const error = new Error('Production adapter contract is incomplete');
    error.code = 'ADAPTER_CONTRACT_INVALID';
    error.issues = issues;
    throw error;
  }
  return true;
}

export function registerAdapterReadiness(registry, adapters) {
  assertProductionAdapters(adapters);
  for (const name of productionAdapterNames) {
    const adapter = adapters[name];
    registry.register(`adapter:${name}`, () => adapter.readiness(), { critical: true });
  }
  return registry;
}
