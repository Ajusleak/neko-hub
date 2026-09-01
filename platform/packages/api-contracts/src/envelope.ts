import type { ISODateTime, RequestId } from "@neikos/domain-types";
import type { ApiErrorDetail } from "./errors.js";

export interface ApiSuccess<T> {
  readonly ok: true;
  readonly data: T;
  readonly requestId: RequestId;
  readonly timestamp: ISODateTime;
}

export interface ApiFailure {
  readonly ok: false;
  readonly error: ApiErrorDetail;
  readonly requestId: RequestId;
  readonly timestamp: ISODateTime;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
