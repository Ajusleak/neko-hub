export class AuthorizationError extends Error {
  constructor(message, { code = 'forbidden', missingScopes = [] } = {}) {
    super(message);
    this.name = 'AuthorizationError';
    this.code = code;
    this.missingScopes = [...missingScopes];
  }
}

export function hasScope(auth, scope) {
  return Boolean(auth && Array.isArray(auth.scopes) && auth.scopes.includes(scope));
}

export function requireScopes(auth, scopes, { mode = 'all' } = {}) {
  if (!auth || auth.method === 'anonymous') {
    throw new AuthorizationError('authentication required', { code: 'unauthorized', missingScopes: scopes });
  }
  const required = [...new Set(scopes)];
  const present = new Set(auth.scopes ?? []);
  const missing = required.filter((scope) => !present.has(scope));
  const allowed = mode === 'any' ? missing.length < required.length : missing.length === 0;
  if (!allowed) {
    throw new AuthorizationError('insufficient scope', {
      code: 'forbidden',
      missingScopes: mode === 'any' ? required : missing
    });
  }
  return auth;
}

export function requireRole(auth, role) {
  if (!auth || auth.method === 'anonymous') {
    throw new AuthorizationError('authentication required', { code: 'unauthorized' });
  }
  if (!(auth.roles ?? []).includes(role)) {
    throw new AuthorizationError('required role is missing', { code: 'forbidden' });
  }
  return auth;
}
