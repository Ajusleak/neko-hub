# P3-I2 — Provider-Neutral API Contracts

**Status:** Implemented / Self-Validated / Awaiting Review  
**Date:** 2026-08-14

## Contract rules

1. Every API result uses a discriminated `ok: true|false` envelope.
2. Every result carries a `requestId` and timestamp.
3. Failures use stable machine-readable error codes plus human-readable messages.
4. Authentication context is provider-neutral: method, subject, scopes, roles, optional session ID.
5. Pagination is cursor-based at the common-contract layer.
6. Events use an explicit versioned envelope with producer, occurrence time, correlation/causation support, subject, and payload.
7. Provider-specific fields belong behind adapters and must not leak into these common contracts without review.

## Machine-readable schemas

- `packages/api-contracts/schemas/api-envelope.schema.json`
- `packages/api-contracts/schemas/auth-context.schema.json`
- `packages/api-contracts/schemas/event-envelope.schema.json`
- `packages/api-contracts/schemas/pagination.schema.json`

## TypeScript source contracts

- `packages/domain-types/src/ids.ts`
- `packages/domain-types/src/pagination.ts`
- `packages/api-contracts/src/envelope.ts`
- `packages/api-contracts/src/errors.ts`
- `packages/api-contracts/src/auth.ts`
- `packages/api-contracts/src/events.ts`
- `packages/api-contracts/src/pagination.ts`

These define shared contract shape only. They do not determine transport framework, database, identity provider, queue, or cloud runtime.
