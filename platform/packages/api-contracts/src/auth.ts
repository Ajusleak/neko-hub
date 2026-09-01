import type { UserId } from "@neikos/domain-types";

export type AuthMethod = "anonymous" | "session" | "bearer" | "service";

export interface AuthContext {
  readonly method: AuthMethod;
  readonly subject?: UserId;
  readonly scopes: readonly string[];
  readonly roles: readonly string[];
  readonly sessionId?: string;
}
