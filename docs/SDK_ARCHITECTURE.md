# SDK Architecture

`lib/api/client.ts` is the initial shared TypeScript SDK surface. Contracts live in `lib/api/contracts.ts`; the mock adapter in `lib/api/mock.ts` implements the production envelope exactly. A production transport replaces the adapter, not the UI.
