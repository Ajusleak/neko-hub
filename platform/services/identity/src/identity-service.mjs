import { requireScopes } from './policy.mjs';

/**
 * Provider-neutral identity boundary.
 * resolver is an injected adapter that validates provider/session material and returns AuthContext.
 */
export class IdentityService {
  constructor({ resolver }) {
    if (!resolver || typeof resolver.resolve !== 'function') {
      throw new TypeError('identity resolver with resolve() is required');
    }
    this.resolver = resolver;
  }

  async resolve(requestContext) {
    const auth = await this.resolver.resolve(requestContext);
    return normalizeAuthContext(auth);
  }

  async authorize(requestContext, requiredScopes, options) {
    const auth = await this.resolve(requestContext);
    return requireScopes(auth, requiredScopes, options);
  }
}

export function normalizeAuthContext(auth) {
  const method = auth?.method ?? 'anonymous';
  const scopes = [...new Set(auth?.scopes ?? [])].sort();
  const roles = [...new Set(auth?.roles ?? [])].sort();
  return {
    method,
    ...(auth?.subject ? { subject: auth.subject } : {}),
    scopes,
    roles,
    ...(auth?.sessionId ? { sessionId: auth.sessionId } : {})
  };
}
