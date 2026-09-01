import { env } from "cloudflare:workers";

export type PublicUser = { id: string; username: string; email: string; provider: string };
const SESSION_COOKIE = "neko_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;

function db(): D1Database {
  if (!env.DB) throw new Error("Account storage is unavailable.");
  return env.DB;
}

export async function ensureAuthSchema() {
  const database = db();
  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, username TEXT NOT NULL COLLATE NOCASE UNIQUE,
      email TEXT NOT NULL COLLATE NOCASE UNIQUE, password_hash TEXT,
      password_salt TEXT, provider TEXT NOT NULL DEFAULT 'password',
      created_at INTEGER NOT NULL
    )`),
    database.prepare(`CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL,
      expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL
    )`),
    database.prepare("CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)"),
    database.prepare("CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)"),
  ]);
}

const bytesToHex = (bytes: Uint8Array) => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
const randomHex = (size = 32) => { const bytes = new Uint8Array(size); crypto.getRandomValues(bytes); return bytesToHex(bytes); };
const sha256 = async (value: string) => bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))));

export async function hashPassword(password: string, salt = randomHex(16)) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: 210000 }, key, 256);
  return { hash: bytesToHex(new Uint8Array(bits)), salt };
}

export async function verifyPassword(password: string, salt: string, expected: string) {
  const { hash } = await hashPassword(password, salt);
  if (hash.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < hash.length; i++) result |= hash.charCodeAt(i) ^ expected.charCodeAt(i);
  return result === 0;
}

export async function createSession(userId: string) {
  const token = randomHex();
  const now = Math.floor(Date.now() / 1000);
  await db().prepare("INSERT INTO sessions (token_hash,user_id,expires_at,created_at) VALUES (?,?,?,?)")
    .bind(await sha256(token), userId, now + SESSION_SECONDS, now).run();
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() { return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`; }

function cookieValue(request: Request, name: string) {
  const match = request.headers.get("cookie")?.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function currentUser(request: Request): Promise<PublicUser | null> {
  await ensureAuthSchema();
  const token = cookieValue(request, SESSION_COOKIE);
  if (!token) return null;
  const now = Math.floor(Date.now() / 1000);
  const row = await db().prepare(`SELECT u.id,u.username,u.email,u.provider FROM sessions s
    JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?`)
    .bind(await sha256(token), now).first<PublicUser>();
  return row ?? null;
}

export async function destroySession(request: Request) {
  const token = cookieValue(request, SESSION_COOKIE);
  if (token) await db().prepare("DELETE FROM sessions WHERE token_hash=?").bind(await sha256(token)).run();
}

export const authDb = db;
export const newId = () => crypto.randomUUID();
export const json = (body: unknown, status = 200, headers?: HeadersInit) => Response.json(body, { status, headers });

export function safeReturnTo(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export function runtimeSecret(name: string) {
  return (env as unknown as Record<string, string | undefined>)[name];
}
