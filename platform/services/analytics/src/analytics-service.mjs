import { randomUUID } from 'node:crypto';

export class AnalyticsService {
  constructor({ sink, clock = () => new Date() }) {
    if (!sink || typeof sink.write !== 'function') throw new TypeError('analytics sink with write() is required');
    this.sink = sink; this.clock = clock;
  }

  async track({ name, actorId, sessionId, properties = {}, correlationId }) {
    if (!name) throw new TypeError('analytics event name is required');
    const event = {
      id: randomUUID(), name, occurredAt: this.clock().toISOString(),
      ...(actorId ? { actorId } : {}), ...(sessionId ? { sessionId } : {}),
      ...(correlationId ? { correlationId } : {}), properties: structuredClone(properties)
    };
    await this.sink.write(event); return event;
  }
}
