export class AiService {
  constructor({ provider, policy = {} }) {
    if (!provider || typeof provider.generate !== 'function') throw new TypeError('AI provider with generate() is required');
    this.provider = provider; this.policy = policy;
  }
  async generate(request) {
    if (!request || typeof request !== 'object') throw new TypeError('request object is required');
    const allowedKinds = this.policy.allowedKinds;
    if (allowedKinds && !allowedKinds.includes(request.kind)) throw new Error(`AI request kind not allowed: ${request.kind}`);
    return this.provider.generate(structuredClone(request));
  }
}
