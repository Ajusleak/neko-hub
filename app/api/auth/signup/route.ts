import { authDb, createSession, ensureAuthSchema, hashPassword, json, newId } from "../../../../lib/auth/server";

export async function POST(request: Request) {
  await ensureAuthSchema();
  const body = await request.json().catch(() => ({})) as Record<string, string>;
  const username = body.username?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";
  if (!username || username.length < 3 || username.length > 24) return json({ error: "Username must be 3–24 characters." }, 400);
  if (!/^[a-zA-Z0-9_.-]+$/.test(username)) return json({ error: "Use only letters, numbers, dots, dashes, or underscores." }, 400);
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Enter a valid email address." }, 400);
  if (password.length < 8) return json({ error: "Password must be at least 8 characters." }, 400);
  const existing = await authDb().prepare("SELECT id FROM users WHERE username=? OR email=?").bind(username, email).first();
  if (existing) return json({ error: "That username or email is already registered." }, 409);
  const id = newId(), createdAt = Math.floor(Date.now() / 1000), credentials = await hashPassword(password);
  await authDb().prepare("INSERT INTO users (id,username,email,password_hash,password_salt,provider,created_at) VALUES (?,?,?,?,?,'password',?)")
    .bind(id, username, email, credentials.hash, credentials.salt, createdAt).run();
  return json({ user: { id, username, email, provider: "password" } }, 201, { "Set-Cookie": await createSession(id) });
}
