export const dynamic = 'force-dynamic';

async function probePersistence() {
  if (!process.env.DATABASE_URL) {
    return { ok: false, reason: 'DATABASE_URL_NOT_CONFIGURED' };
  }
  try {
    const { createPrismaClient } = await import('../../../../../packages/persistence-prisma/src/client.ts');
    const { createPrismaReadiness } = await import('../../../../../packages/persistence-prisma/src/repositories.ts');
    const prisma = createPrismaClient();
    try {
      return await createPrismaReadiness(prisma).readiness();
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    return { ok: false, reason: 'PERSISTENCE_RUNTIME_UNAVAILABLE' };
  }
}

export async function GET() {
  const persistence = await probePersistence();
  return Response.json(
    { status: persistence.ok ? 'ready' : 'not_ready', checks: { persistence } },
    { status: persistence.ok ? 200 : 503, headers: { 'cache-control': 'no-store' } }
  );
}
