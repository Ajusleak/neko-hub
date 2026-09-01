export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    service: 'neikos-web-next',
    releaseVersion: process.env.NEIKOS_RELEASE_VERSION ?? 'authoring',
    deploymentId: process.env.NEIKOS_DEPLOYMENT_ID ?? 'local-build',
    persistence: 'postgresql-prisma-gated'
  }, { headers: { 'cache-control': 'no-store' } });
}
