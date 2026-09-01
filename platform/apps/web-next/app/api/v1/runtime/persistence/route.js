export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({ ok: false, code: 'DATABASE_URL_NOT_CONFIGURED' }, { status: 503 });
  }
  try {
    const { createPrismaClient } = await import('../../../../../../../packages/persistence-prisma/src/client.ts');
    const prisma = createPrismaClient();
    try {
      await prisma.$queryRaw`SELECT 1`;
      return Response.json({ ok: true, persistence: 'postgresql-prisma' }, { headers: { 'cache-control': 'no-store' } });
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    return Response.json({ ok: false, code: 'PERSISTENCE_RUNTIME_UNAVAILABLE' }, { status: 503, headers: { 'cache-control': 'no-store' } });
  }
}
