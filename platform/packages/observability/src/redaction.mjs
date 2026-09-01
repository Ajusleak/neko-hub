const SENSITIVE_HEADER_NAMES = new Set([
  'authorization',
  'proxy-authorization',
  'cookie',
  'set-cookie',
  'x-api-key',
  'x-auth-token'
]);

export function redactHeaders(input = {}) {
  const output = {};
  const entries = input instanceof Headers ? input.entries() : Object.entries(input);
  for (const [key, value] of entries) {
    output[key] = SENSITIVE_HEADER_NAMES.has(String(key).toLowerCase()) ? '[REDACTED]' : String(value);
  }
  return output;
}

export function redactObject(value, { keys = ['password', 'secret', 'token', 'accessToken', 'refreshToken', 'apiKey'] } = {}) {
  const sensitive = new Set(keys.map((key) => key.toLowerCase()));
  const seen = new WeakSet();
  function visit(node) {
    if (node === null || typeof node !== 'object') return node;
    if (seen.has(node)) return '[Circular]';
    seen.add(node);
    if (Array.isArray(node)) return node.map(visit);
    const out = {};
    for (const [key, child] of Object.entries(node)) {
      out[key] = sensitive.has(key.toLowerCase()) ? '[REDACTED]' : visit(child);
    }
    return out;
  }
  return visit(value);
}
