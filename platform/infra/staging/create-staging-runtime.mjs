import { IdentityService } from '../../services/identity/src/identity-service.mjs';
import { FortniteCatalogService } from '../../services/fortnite/src/catalog.mjs';
import { LockerService } from '../../services/locker/src/locker-service.mjs';
import { CollectionService } from '../../services/collections/src/collection-service.mjs';
import { WishlistService } from '../../services/wishlist/src/wishlist-service.mjs';
import { SearchService } from '../../services/search/src/search-service.mjs';
import { InMemoryEventBus, NotificationService } from '../../services/notifications/src/event-bus.mjs';
import { AiService } from '../../services/ai/src/ai-service.mjs';
import { AssetService } from '../../services/assets/src/asset-service.mjs';
import { AnalyticsService } from '../../services/analytics/src/analytics-service.mjs';
import { AdminService } from '../../services/admin/src/admin-service.mjs';
import { NeikosHubWebFacade } from '../../apps/web/src/platform-facade.mjs';
import { ReadinessRegistry } from '../../packages/observability/src/health.mjs';
import { registerAdapterReadiness } from '../contracts/adapter-contract.mjs';
import { createLocalStagingAdapters } from './staging-adapters.mjs';

export async function createLocalStagingRuntime({ readinessTimeoutMs = 1000 } = {}) {
  const adapters = await createLocalStagingAdapters();
  const identity = new IdentityService({ resolver: adapters.identityResolver });
  const catalog = new FortniteCatalogService({ provider: adapters.catalogProvider });
  const locker = new LockerService({ repository: adapters.repositories.locker, catalog });
  const collections = new CollectionService({ repository: adapters.repositories.collections });
  const wishlist = new WishlistService({ repository: adapters.repositories.wishlist });
  const search = new SearchService({ sources: [catalog] });
  const events = new InMemoryEventBus();
  const notifications = new NotificationService({ channel: adapters.notificationChannel });
  const ai = new AiService({ provider: adapters.aiProvider, policy: { allowedKinds: ['summary', 'metadata'] } });
  const assets = new AssetService({ metadataRepository: adapters.repositories.assets, blobStore: adapters.blobStore });
  const analytics = new AnalyticsService({ sink: adapters.analyticsSink });
  const admin = new AdminService({ analytics, auditSink: adapters.auditSink });
  const web = new NeikosHubWebFacade({ identity, catalog, locker, collections, wishlist, search, events });
  const readiness = registerAdapterReadiness(new ReadinessRegistry({ timeoutMs: readinessTimeoutMs }), adapters.adapterReadiness);

  return {
    services: { identity, catalog, locker, collections, wishlist, search, events, notifications, ai, assets, analytics, admin, web },
    readiness,
    adapters
  };
}
