export const API_ERROR_CODES = [
  "bad_request",
  "unauthorized",
  "forbidden",
  "not_found",
  "conflict",
  "rate_limited",
  "validation_failed",
  "dependency_failed",
  "internal_error"
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export interface ApiErrorDetail {
  readonly code: ApiErrorCode | (string & {});
  readonly message: string;
  readonly field?: string;
  readonly retryable?: boolean;
  readonly details?: Readonly<Record<string, unknown>>;
}
