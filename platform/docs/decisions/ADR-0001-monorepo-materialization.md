# ADR-0001 — Priority 3 Monorepo Materialization

**Status:** Draft  
**Date:** 2026-08-14

## Context

Priority 3 architecture defines applications, services, shared packages, infrastructure, tests, scripts, and documentation as one governed implementation system. The retrieved Library contained NEOS governance artifacts but not a complete application source tree.

## Decision

Create a single `NEIKOS-PLATFORM` worktree with explicit application, service, and package boundaries. Use workspace metadata only to make boundaries machine-detectable. Defer framework-specific choices until the corresponding implementation specification is present or approved.

## Consequences

- Repository topology can be validated immediately.
- API contracts can be implemented before service coupling grows.
- Framework selection remains open and cannot be inferred from this bootstrap.
- This ADR remains draft until reviewed under NEOS.
