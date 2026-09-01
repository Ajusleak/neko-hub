import { randomUUID } from 'node:crypto';

export class InMemoryEventBus {
  constructor() { this.handlers = new Map(); this.history = []; }
  subscribe(type, handler) {
    const list = this.handlers.get(type) ?? []; list.push(handler); this.handlers.set(type, list);
    return () => this.handlers.set(type, (this.handlers.get(type) ?? []).filter((h) => h !== handler));
  }
  async publish(type, payload, metadata = {}) {
    const event = { eventId: randomUUID(), type, version: metadata.version ?? 1, occurredAt: new Date().toISOString(), producer: metadata.producer ?? 'unknown', ...(metadata.correlationId ? { correlationId: metadata.correlationId } : {}), ...(metadata.subject ? { subject: metadata.subject } : {}), payload };
    this.history.push(event);
    for (const handler of [...(this.handlers.get(type) ?? []), ...(this.handlers.get('*') ?? [])]) await handler(event);
    return event;
  }
}

export class NotificationService {
  constructor({ channel }) { if (!channel || typeof channel.send !== 'function') throw new TypeError('notification channel with send() is required'); this.channel = channel; }
  async send(notification) { return this.channel.send(structuredClone(notification)); }
}
