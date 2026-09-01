import { createHash } from 'node:crypto';

export function sha256(data) { return createHash('sha256').update(data).digest('hex'); }

export class AssetService {
  constructor({ metadataRepository, blobStore }) {
    if (!metadataRepository || !blobStore) throw new TypeError('metadataRepository and blobStore are required');
    this.metadataRepository = metadataRepository; this.blobStore = blobStore;
  }
  async put({ id, bytes, contentType, ownerId, metadata = {} }) {
    if (!id || bytes === undefined) throw new TypeError('id and bytes are required');
    const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
    const checksum = sha256(buffer);
    await this.blobStore.put(id, buffer, { contentType });
    const record = { id, contentType, ownerId, size: buffer.length, sha256: checksum, metadata: structuredClone(metadata), updatedAt: new Date().toISOString() };
    await this.metadataRepository.upsert(record); return record;
  }
  async getMetadata(id) { return this.metadataRepository.get(id); }
}
