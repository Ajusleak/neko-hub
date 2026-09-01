import { authDb, createSession, ensureAuthSchema, newId, runtimeSecret, safeReturnTo } from "../../../../../lib/auth/server";

function oauthCookie(request: Request) {
  return request.headers.get("cookie")?.match(/(?:^|; )neko_oauth=([^;]*)/)?.[1] ?? "";
}

export async function GET(request: Request) {
  const url = new URL(request.url), code = url.searchParams.get("code"), state = url.searchParams.get("state");
  const [expectedState, encodedReturnTo] = oauthCookie(request).split(".");
  const clientId = runtimeSecret("GOOGLE_CLIENT_ID"), clientSecret = runtimeSecret("GOOGLE_CLIENT_SECRET");
  if (!code || !state || state !== expectedState || !clientId || !clientSecret) return Response.redirect(new URL("/login?error=google_failed", url), 302);
  const redirectUri = new URL("/api/auth/google/callback", url).toString();
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }) });
  if (!tokenResponse.ok) return Response.redirect(new URL("/login?error=google_failed", url), 302);
  const token = await tokenResponse.json() as { access_token?: string };
  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` } });
  if (!profileResponse.ok) return Response.redirect(new URL("/login?error=google_failed", url), 302);
  const profile = await profileResponse.json() as { sub: string; email: string; name?: string };
  await ensureAuthSchema();
  let user = await authDb().prepare("SELECT id,username,email,provider FROM users WHERE email=?").bind(profile.email.toLowerCase()).first<{id:string;username:string;email:string;provider:string}>();
  if (!user) {
    const id = newId(), base = (profile.name || profile.email.split("@")[0]).replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 20) || "NekoUser";
    let username = base, suffix = 1;
    while (await authDb().prepare("SELECT id FROM users WHERE username=?").bind(username).first()) username = `${base.slice(0, 18)}${suffix++}`;
    await authDb().prepare("INSERT INTO users (id,username,email,provider,created_at) VALUES (?,?,?,'google',?)").bind(id, username, profile.email.toLowerCase(), Math.floor(Date.now()/1000)).run();
    user = { id, username, email: profile.email.toLowerCase(), provider: "google" };
  }
  const returnTo = safeReturnTo(encodedReturnTo ? decodeURIComponent(encodedReturnTo) : "/");
  return new Response(null, { status: 302, headers: { Location: new URL(returnTo, url).toString(), "Set-Cookie": await createSession(user.id) } });
}
