import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MemoryKeyedRepository } from '../../packages/testing/src/memory-repository.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

function csvHeader(headers, name) {
  const raw = headers?.[name] ?? headers?.[name.toLowerCase()] ?? '';
  return [...new Set(String(raw).split(',').map((value) => value.trim()).filter(Boolean))].sort();
}

function createIdentityResolver() {
  return {
    id: 'local-staging-header-identity-v1',
    async resolve(requestContext = {}) {
      const headers = requestContext.headers ?? {};
      const subject = headers['x-neikos-subject'];
      if (!subject) return { method: 'anonymous', scopes: [], roles: [] };
      return {
        method: 'local-staging-header',
        subject: String(subject),
        scopes: csvHeader(headers, 'x-neikos-scopes'),
        roles: csvHeader(headers, 'x-neikos-roles'),
        sessionId: headers['x-neikos-session'] ? String(headers['x-neikos-session']) : undefined
      };
    },
    async readiness() { return { ok: true, details: { mode: 'local-staging-header', nonProduction: true } }; }
  };
}

async function createCatalogProvider() {
  const items = JSON.parse(await readFile(path.join(here, 'catalog-fixture.json'), 'utf8'));
  return {
    id: 'local-staging-fortnite-fixture-v1',
    async getItem(id) { return items.find((item) => item.id === id); },
    async search(query, { limit = 25 } = {}) {
      const q = String(query ?? '').toLowerCase();
      return items.filter((item) => `${item.name} ${item.description} ${item.type}`.toLowerCase().includes(q)).slice(0, limit);
    },
    async readiness() { return { ok: true, details: { fixtureItems: items.length, nonProduction: true } }; }
  };
}

function readyAdapter(id, details = {}) {
  return { id, async readiness() { return { ok: true, details: { ...details, nonProduction: true } }; } };
}

export async function createLocalStagingAdapters() {
  const identityResolver = createIdentityResolver();
  const catalogProvider = await createCatalogProvider();
  const repositories = {
    locker: new MemoryKeyedRepository(),
    collections: new MemoryKeyedRepository(),
    wishlist: new MemoryKeyedRepository(),
    assets: new MemoryKeyedRepository()
  };
  const notifications = [];
  const analytics = [];
  const audits = [];
  const blobs = new Map();

  const adapterReadiness = {
    identity: identityResolver,
    persistence: readyAdapter('local-staging-memory-persistence-v1', { volatile: true }),
    events: readyAdapter('local-staging-memory-events-v1', { volatile: true }),
    notifications: readyAdapter('local-staging-memory-notifications-v1', { volatile: true }),
    fortnite: catalogProvider,
    ai: readyAdapter('local-staging-echo-ai-v1', { synthetic: true }),
    observability: readyAdapter('local-staging-process-observability-v1', { exporter: 'process' })
  };

  return {
    identityResolver,
    catalogProvider,
    repositories,
    notificationChannel: { async send(notification) { notifications.push(structuredClone(notification)); return { accepted: true }; } },
    analyticsSink: { async write(event) { analytics.push(structuredClone(event)); } },
    auditSink: { async write(record) { audits.push(structuredClone(record)); } },
    blobStore: { async put(id, bytes) { blobs.set(id, Buffer.from(bytes)); } },
    aiProvider: { async generate(request) { return { provider: 'local-staging-echo-ai-v1', request: structuredClone(request) }; } },
    adapterReadiness,
    state: { notifications, analytics, audits, blobs },
    metadata: { nonProduction: true, persistence: 'memory', identity: 'request-headers' }
  };
}
