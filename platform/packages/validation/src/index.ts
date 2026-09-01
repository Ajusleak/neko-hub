export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export { validateApiResult, validateEventEnvelope } from "./contracts.mjs";
