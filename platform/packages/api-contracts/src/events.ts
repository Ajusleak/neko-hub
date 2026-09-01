import type { CorrelationId, EventId, ISODateTime } from "@neikos/domain-types";

export interface EventEnvelope<TType extends string = string, TPayload = unknown> {
  readonly eventId: EventId;
  readonly type: TType;
  readonly version: number;
  readonly occurredAt: ISODateTime;
  readonly producer: string;
  readonly correlationId?: CorrelationId;
  readonly causationId?: EventId;
  readonly subject?: string;
  readonly payload: TPayload;
}
