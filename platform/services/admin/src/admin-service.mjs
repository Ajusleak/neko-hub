import { requireRole } from '../../identity/src/policy.mjs';

export class AdminService {
  constructor({ analytics, auditSink }) { this.analytics = analytics; this.auditSink = auditSink; }

  async execute(auth, action, payload = {}) {
    requireRole(auth, 'admin');
    const result = await action(structuredClone(payload));
    const audit = {
      action: payload.actionName ?? action.name ?? 'anonymous-action',
      actorId: auth.subject,
      occurredAt: new Date().toISOString(),
      payload: structuredClone(payload)
    };
    if (this.auditSink?.write) await this.auditSink.write(audit);
    if (this.analytics) await this.analytics.track({ name: 'admin.action.executed', actorId: auth.subject, properties: { action: audit.action } });
    return result;
  }
}
