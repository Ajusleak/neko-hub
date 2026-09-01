import { runtimeSecret, safeReturnTo } from "../../../../lib/auth/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = runtimeSecret("GOOGLE_CLIENT_ID");
  if (!clientId) return Response.redirect(new URL("/login?error=google_not_configured", url), 302);
  const state = crypto.randomUUID();
  const redirectUri = new URL("/api/auth/google/callback", url).toString();
  const target = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  target.search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: "code", scope: "openid email profile", state, prompt: "select_account" }).toString();
  const returnTo = safeReturnTo(url.searchParams.get("returnTo"));
  return new Response(null, { status: 302, headers: { Location: target.toString(), "Set-Cookie": `neko_oauth=${state}.${encodeURIComponent(returnTo)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600` } });
}
