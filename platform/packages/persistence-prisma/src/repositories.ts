import { PrismaKeyedRepository } from './keyed-repository.mjs';

export function createPrismaRepositories(prisma: any) {
  if (!prisma) throw new TypeError('prisma client is required');
  return {
    locker: new PrismaKeyedRepository({ model: prisma.lockerRecord }),
    collections: new PrismaKeyedRepository({ model: prisma.collectionRecord }),
    wishlist: new PrismaKeyedRepository({ model: prisma.wishlistRecord }),
    assets: new PrismaKeyedRepository({ model: prisma.assetRecord })
  };
}

export function createPrismaReadiness(prisma: any) {
  return {
    id: 'postgresql-prisma-persistence-v1',
    async readiness() {
      try {
        await prisma.$queryRaw`SELECT 1`;
        return { ok: true, details: { datastore: 'postgresql', orm: 'prisma' } };
      } catch (error: any) {
        return { ok: false, details: { datastore: 'postgresql', orm: 'prisma', reason: 'DATABASE_PROBE_FAILED' } };
      }
    }
  };
}
