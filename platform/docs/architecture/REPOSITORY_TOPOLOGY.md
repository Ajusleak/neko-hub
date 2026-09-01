# Repository Topology — Priority 3

**Status:** Draft / Authoring  
**Scope:** Physical materialization of the approved Priority 3 platform boundaries.

## Boundary rule

Applications consume shared packages and service APIs. Services may consume shared packages, but must not import another service's private source tree directly. Cross-service behavior belongs behind explicit contracts/events.

## Layout

```text
NEIKOS-PLATFORM/
├── apps/{web,android,discord}
├── services/{identity,users,fortnite,locker,collections,wishlist,search,notifications,ai,assets,analytics,admin}
├── packages/{api-contracts,api-client,domain-types,validation,config,observability,testing,ui}
├── infra/
├── tests/
├── scripts/
└── docs/
```

## Materialization assumptions

- The workspace is bootstrapped as a Node-compatible TypeScript monorepo shell because the detailed framework/runtime selections were not present in the retrieved NEOS artifacts.
- No web, Android, database, queue, cloud, or provider framework is declared authoritative by this scaffold.
- Service source files are intentionally minimal boundary markers; they do not claim functional implementation.
- Detailed API contracts are the next implementation unit and should become the stable dependency surface before service internals expand.
