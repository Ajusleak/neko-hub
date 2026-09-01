import { clearSessionCookie, destroySession, json } from "../../../../lib/auth/server";
export async function POST(request: Request) {
  await destroySession(request);
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
