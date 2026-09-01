/**
 * NEIKOS runtime configuration boundary.
 * Production-like environments fail closed when required deployment metadata,
 * adapter declarations, or secret-reference indirections are missing.
 */
export const moduleId = "packages/config" as const;
export const implementationStatus = "implemented-self-validated-production-readiness" as const;
export { loadRuntimeConfig, ConfigValidationError, runtimeAdapterKeys } from "./runtime-config.mjs";
