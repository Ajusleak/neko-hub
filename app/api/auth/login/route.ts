import { authDb, createSession, ensureAuthSchema, json, verifyPassword } from "../../../../lib/auth/server";

type Account = { id: string; username: string; email: string; provider: string; password_hash: string | null; password_salt: string | null };
export async function POST(request: Request) {
  await ensureAuthSchema();
  const body = await request.json().catch(() => ({})) as Record<string, string>;
  const identifier = body.identifier?.trim().toLowerCase(), password = body.password ?? "";
  if (!identifier || !password) return json({ error: "Enter your username or email and password." }, 400);
  const account = await authDb().prepare("SELECT id,username,email,provider,password_hash,password_salt FROM users WHERE username=? OR email=?")
    .bind(identifier, identifier).first<Account>();
  if (!account?.password_hash || !account.password_salt || !(await verifyPassword(password, account.password_salt, account.password_hash)))
    return json({ error: "The username/email or password is incorrect." }, 401);
  const { password_hash: _hash, password_salt: _salt, ...user } = account;
  return json({ user }, 200, { "Set-Cookie": await createSession(account.id) });
}
