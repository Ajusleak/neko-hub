export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ status: 'live', service: 'neikos-web-next' }, { headers: { 'cache-control': 'no-store' } });
}
