# NEIKOS HUB Engineering Index

**Document ID:** NEOS-MANIFEST-001  
**Status:** Draft — Priority 3 Physical Implementation Authoring  
**Version:** 0.1.0-authoring  
**Authority:** NEOS Repository Operating System  
**Last updated:** 2026-08-16

## Repository identity

This worktree materializes the NEIKOS HUB platform implementation architecture under NEOS governance. It does not declare a new approved baseline.

## Governance entry points

1. `README.md` — NEOS repository orientation (preserved from the existing Library artifact).
2. `AGENTS.md` — NEOS AI contributor operating guide (preserved from the existing Library artifact).
3. `00_ENGINEERING_INDEX.md` — draft implementation manifest for this worktree.
4. `docs/implementation/P3_IMPLEMENTATION_STATUS.md` — physical implementation status and validation record.
5. `docs/architecture/REPOSITORY_TOPOLOGY.md` — repository materialization map.

## Physical implementation domains

### Applications
- `apps/web`
- `apps/android`
- `apps/discord`

### Services
- `services/identity`
- `services/users`
- `services/fortnite`
- `services/locker`
- `services/collections`
- `services/wishlist`
- `services/search`
- `services/notifications`
- `services/ai`
- `services/assets`
- `services/analytics`
- `services/admin`

### Shared packages
- `packages/api-contracts`
- `packages/api-client`
- `packages/domain-types`
- `packages/validation`
- `packages/config`
- `packages/observability`
- `packages/testing`
- `packages/ui`

### Platform support
- `infra`
- `tests`
- `scripts`
- `docs`

## Priority 3 physical execution state

| Work item | State | Notes |
|---|---|---|
| P3-I1 Repository Materialization | Implemented / self-validated | Worktree and structural validator created. |
| P3-I2 API Contracts | Implemented / self-validated | Common envelopes, auth context, pagination, event envelope, schemas, runtime validation. |
| P3-I3 Shared SDK | Implemented / self-validated | Fetch transport, auth propagation, request IDs, timeout, envelope validation, typed errors. |
| P3-I4 Identity/Security | Implemented / self-validated / review required | Provider-neutral resolver, scope/role policy, deny-by-default authorization, sensitive-data redaction. |
| P3-I5 Fortnite Services | Core implemented / self-validated | Provider-neutral catalog + executable locker/collection/wishlist domain services. |
| P3-I6 Search/AI | Core implemented / self-validated | Search aggregation/ranking and provider-neutral AI execution boundary. |
| P3-I7 Events/Notifications | Core implemented / self-validated | Versioned event bus behavior + injected notification channel. |
| P3-I8 Assets/Data | Core implemented / self-validated | Blob/metadata separation + SHA-256 asset provenance. |
| P3-I9 Web Integration | Core implemented / self-validated | Framework-neutral web facade composes authenticated read/mutation flows. |
| P3-I10 Admin/Analytics | Core implemented / self-validated | Role-gated admin execution, audit sink, analytics sink. |
| P3-I11 Integration Testing | Implemented / self-validated | End-to-end provider-neutral application flow tests. |
| P3-I12 Production Validation | Readiness layer implemented / self-validated / external gates pending | Runtime config, secret-reference policy, adapter readiness, health endpoints, deployment profiles, runbooks, release validator, and tests implemented. Real staging/security/load/rollback/approval evidence remains required. |

## Baseline statement

This worktree is **authoring**, not approved or baselined. NEOS review and approval gates remain required before baseline freeze.

## Priority 4 staging execution state

| Work item | State | Notes |
|---|---|---|
| P4-S1 Local Staging Runtime | Implemented / self-validated locally | Runnable Node HTTP surface, explicit non-production adapters, local deployment profile, smoke/failure/load harnesses, and container definitions. External staging remains pending. |

### P4-S1 validation evidence

- 31/31 automated tests passed.
- Repository validator passed: 30 required paths / 23 workspace packages.
- P3-I12 readiness validator passed.
- Local-staging artifact validator passed: 13 required artifacts.
- HTTP staging smoke passed: 7/7 checks.
- Local readiness failure/recovery passed: `ready → not_ready → ready` / HTTP `200 → 503 → 200`.
- Local load smoke passed: 200 requests, zero failures. Local throughput/latency values are environment-specific and are not production capacity evidence.
- Container definitions are authored; container-runtime validation remains pending because an OCI container engine was not available in the execution environment.

The P4-S1 local adapters are explicitly non-production and may not be promoted as production provider implementations.
