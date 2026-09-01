import { randomUUID } from 'node:crypto';
import { validateApiResult } from '../../validation/src/contracts.mjs';

export class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = options.status;
    this.code = options.code;
    this.requestId = options.requestId;
    this.retryable = options.retryable ?? false;
  }
}

export class NeikosApiClient {
  constructor({ baseUrl, fetchImpl = globalThis.fetch, tokenProvider, timeoutMs = 10000, defaultHeaders = {} }) {
    if (!baseUrl) throw new TypeError('baseUrl is required');
    if (typeof fetchImpl !== 'function') throw new TypeError('fetch implementation is required');
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.fetchImpl = fetchImpl;
    this.tokenProvider = tokenProvider;
    this.timeoutMs = timeoutMs;
    this.defaultHeaders = { ...defaultHeaders };
  }

  async request(pathname, options = {}) {
    const requestId = options.requestId ?? randomUUID();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(new Error('request timeout')), options.timeoutMs ?? this.timeoutMs);
    const headers = new Headers(this.defaultHeaders);
    headers.set('accept', 'application/json');
    headers.set('x-request-id', requestId);
    if (options.body !== undefined) headers.set('content-type', 'application/json');
    for (const [key, value] of Object.entries(options.headers ?? {})) headers.set(key, value);

    if (this.tokenProvider) {
      const token = await this.tokenProvider();
      if (token) headers.set('authorization', `Bearer ${token}`);
    }

    try {
      const response = await this.fetchImpl(`${this.baseUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, {
        method: options.method ?? (options.body === undefined ? 'GET' : 'POST'),
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: controller.signal
      });

      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new ApiClientError('response was not valid JSON', { status: response.status, requestId });
      }

      const validation = validateApiResult(payload);
      if (!validation.valid) {
        throw new ApiClientError(`invalid NEIKOS API envelope: ${validation.errors.join('; ')}`, {
          status: response.status,
          requestId
        });
      }

      if (!payload.ok) {
        throw new ApiClientError(payload.error.message, {
          status: response.status,
          code: payload.error.code,
          requestId: payload.requestId,
          retryable: payload.error.retryable
        });
      }

      return payload;
    } finally {
      clearTimeout(timeout);
    }
  }
}
