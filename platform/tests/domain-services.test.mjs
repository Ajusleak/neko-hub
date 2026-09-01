import test from 'node:test';
import assert from 'node:assert/strict';
import { MemoryKeyedRepository } from '../packages/testing/src/memory-repository.mjs';
import { FortniteCatalogService } from '../services/fortnite/src/catalog.mjs';
import { LockerService } from '../services/locker/src/locker-service.mjs';
import { CollectionService } from '../services/collections/src/collection-service.mjs';
import { WishlistService } from '../services/wishlist/src/wishlist-service.mjs';
import { SearchService } from '../services/search/src/search-service.mjs';
import { AiService } from '../services/ai/src/ai-service.mjs';
import { InMemoryEventBus } from '../services/notifications/src/event-bus.mjs';
import { AssetService, sha256 } from '../services/assets/src/asset-service.mjs';

const items = [
  { id: 'cid_1', name: 'Fox Blade', type: 'pickaxe', description: 'violet fox tool' },
  { id: 'cid_2', name: 'Fox Empress', type: 'outfit', description: 'creator outfit' }
];
const provider = { getItem: async (id) => items.find((x) => x.id === id), search: async (q) => items.filter((x) => `${x.name} ${x.description}`.toLowerCase().includes(q.toLowerCase())) };

test('Fortnite catalog + locker + collections + wishlist core compose without provider coupling', async () => {
  const catalog = new FortniteCatalogService({ provider });
  const lockerRepo = new MemoryKeyedRepository(); const locker = new LockerService({ repository: lockerRepo, catalog });
  const added = await locker.add('u1', 'cid_1', { favorite: true }); assert.equal(added.item.name, 'Fox Blade'); assert.equal(await locker.has('u1', 'cid_1'), true);
  const collections = new CollectionService({ repository: new MemoryKeyedRepository() }); await collections.create('u1', { id: 'favorites', name: 'Favorites' });
  const collection = await collections.addItem('u1', 'favorites', 'cid_1'); assert.deepEqual(collection.itemIds, ['cid_1']);
  const wishlist = new WishlistService({ repository: new MemoryKeyedRepository() }); await wishlist.add('u1', 'cid_2', { priority: 'high' }); assert.equal((await wishlist.list('u1'))[0].priority, 'high');
});

test('search aggregates and ranks source results deterministically', async () => {
  const catalog = new FortniteCatalogService({ provider }); const search = new SearchService({ sources: [catalog] });
  const result = await search.search('Fox'); assert.deepEqual(result.map((x) => x.id), ['cid_1', 'cid_2']);
});

test('AI service delegates only allowed request kinds', async () => {
  const ai = new AiService({ provider: { generate: async (request) => ({ providerEcho: request }) }, policy: { allowedKinds: ['summary'] } });
  assert.equal((await ai.generate({ kind: 'summary', input: 'x' })).providerEcho.kind, 'summary');
  await assert.rejects(() => ai.generate({ kind: 'image', input: 'x' }));
});

test('event bus emits versioned common envelope', async () => {
  const bus = new InMemoryEventBus(); let seen; bus.subscribe('locker.item.added', (event) => { seen = event; });
  const event = await bus.publish('locker.item.added', { itemId: 'cid_1' }, { producer: 'locker', subject: 'u1' });
  assert.equal(seen.eventId, event.eventId); assert.equal(event.version, 1); assert.equal(event.producer, 'locker');
});

test('asset service records checksum and separates blob/metadata ports', async () => {
  const metadataRepository = new MemoryKeyedRepository(); const blobs = new Map();
  const blobStore = { put: async (id, bytes) => blobs.set(id, Buffer.from(bytes)) };
  const assets = new AssetService({ metadataRepository, blobStore }); const record = await assets.put({ id: 'a1', bytes: 'hello', contentType: 'text/plain', ownerId: 'u1' });
  assert.equal(record.sha256, sha256('hello')); assert.equal(blobs.get('a1').toString(), 'hello');
});
