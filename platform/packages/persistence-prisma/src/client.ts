import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client/client';

export function createPrismaClient(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl || !/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
    throw new Error('DATABASE_URL must be a PostgreSQL connection URL');
  }
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}
