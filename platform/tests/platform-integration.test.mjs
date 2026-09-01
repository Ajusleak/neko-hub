import test from 'node:test';
import assert from 'node:assert/strict';
import { MemoryKeyedRepository } from '../packages/testing/src/memory-repository.mjs';
import { IdentityService } from '../services/identity/src/identity-service.mjs';
import { FortniteCatalogService } from '../services/fortnite/src/catalog.mjs';
import { LockerService } from '../services/locker/src/locker-service.mjs';
import { CollectionService } from '../services/collections/src/collection-service.mjs';
import { WishlistService } from '../services/wishlist/src/wishlist-service.mjs';
import { SearchService } from '../services/search/src/search-service.mjs';
import { InMemoryEventBus } from '../services/notifications/src/event-bus.mjs';
import { AnalyticsService } from '../services/analytics/src/analytics-service.mjs';
import { AdminService } from '../services/admin/src/admin-service.mjs';
import { NeikosHubWebFacade } from '../apps/web/src/platform-facade.mjs';

function buildPlatform(authContext) {
  const items = [
    { id: 'cid_fox', name: 'Fox Empress', type: 'outfit', description: 'violet creator outfit' },
    { id: 'cid_blade', name: 'Fox Blade', type: 'pickaxe', description: 'fox tool' }
  ];
  const provider = { getItem: async (id) => items.find((x) => x.id === id), search: async (q) => items.filter((x) => `${x.name} ${x.description}`.toLowerCase().includes(q.toLowerCase())) };
  const identity = new IdentityService({ resolver: { resolve: async () => authContext } });
  const catalog = new FortniteCatalogService({ provider });
  const locker = new LockerService({ repository: new MemoryKeyedRepository(), catalog });
  const collections = new CollectionService({ repository: new MemoryKeyedRepository() });
  const wishlist = new WishlistService({ repository: new MemoryKeyedRepository() });
  const search = new SearchService({ sources: [catalog] });
  const events = new InMemoryEventBus();
  const web = new NeikosHubWebFacade({ identity, catalog, locker, collections, wishlist, search, events });
  return { identity, catalog, locker, collections, wishlist, search, events, web };
}

test('authenticated web flow searches and mutates locker/wishlist with events', async () => {
  const platform = buildPlatform({ method: 'session', subject: 'u1', scopes: ['locker:write', 'wishlist:write'], roles: ['user'] });
  const seen = []; platform.events.subscribe('*', (event) => seen.push(event.type));
  await platform.web.addLockerItem({}, 'cid_fox');
  await platform.web.addWishlistItem({}, 'cid_blade', { priority: 'high' });
  const home = await platform.web.home({}, { query: 'Fox' });
  assert.equal(home.searchResults.length, 2);
  assert.equal(home.lockerItems.length, 1);
  assert.equal(home.wishlistItems.length, 1);
  assert.deepEqual(seen, ['locker.item.added', 'wishlist.item.added']);
});

test('web mutation is denied when scope is missing', async () => {
  const platform = buildPlatform({ method: 'session', subject: 'u1', scopes: [], roles: ['user'] });
  await assert.rejects(() => platform.web.addLockerItem({}, 'cid_fox'));
});

test('admin execution requires admin role and records audit + analytics', async () => {
  const analyticsEvents = []; const audits = [];
  const analytics = new AnalyticsService({ sink: { write: async (event) => analyticsEvents.push(event) } });
  const admin = new AdminService({ analytics, auditSink: { write: async (record) => audits.push(record) } });
  const result = await admin.execute({ method: 'session', subject: 'admin-1', scopes: [], roles: ['admin'] }, async (payload) => ({ ok: true, payload }), { actionName: 'reindex', force: false });
  assert.equal(result.ok, true); assert.equal(audits.length, 1); assert.equal(analyticsEvents[0].name, 'admin.action.executed');
  await assert.rejects(() => admin.execute({ method: 'session', subject: 'u1', scopes: [], roles: ['user'] }, async () => true));
});
