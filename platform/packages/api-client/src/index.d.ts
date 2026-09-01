export interface ClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  tokenProvider?: () => string | undefined | Promise<string | undefined>;
  timeoutMs?: number;
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  requestId?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

export declare class ApiClientError extends Error {
  status?: number;
  code?: string;
  requestId?: string;
  retryable: boolean;
}

export declare class NeikosApiClient {
  constructor(options: ClientOptions);
  request<T>(pathname: string, options?: RequestOptions): Promise<{
    ok: true;
    data: T;
    requestId: string;
    timestamp: string;
  }>;
}
