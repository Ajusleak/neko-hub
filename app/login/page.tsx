"use client";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const [mode, setMode] = useState<"login"|"signup">(params.get("mode") === "signup" ? "signup" : "login");
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const googleError = params.get("error");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`/api/auth/${mode}`, { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(data) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not continue.");
      window.location.href = "/";
    } catch (issue) { setError(issue instanceof Error ? issue.message : "Could not continue."); }
    finally { setBusy(false); }
  }
  const switchMode = (next:"login"|"signup") => { setMode(next); setError(""); };
  return <main className="auth-page"><a className="auth-back" href="/">← Back to Neko Hub</a><section className="auth-card"><div className="auth-mark fox-idle" aria-hidden="true">🦊</div><small>NEKO HUB ACCOUNT</small><h1>{mode === "login" ? "Welcome back." : "Create your account."}</h1><p>{mode === "login" ? "Sign in to sync your locker, collections, and intelligence preferences." : "One account for your locker, wishlists, alerts, and collection progress."}</p><div className="auth-tabs"><button className={mode === "login" ? "active" : ""} onClick={()=>switchMode("login")}>Log In</button><button className={mode === "signup" ? "active" : ""} onClick={()=>switchMode("signup")}>Sign Up</button></div><a className="google-button" href="/api/auth/google"><span>G</span>Continue with Google</a>{googleError && <div className="auth-error">{googleError === "google_not_configured" ? "Google sign-in needs its client ID and secret configured first." : "Google sign-in could not be completed. Please try again."}</div>}<div className="auth-divider"><span>or continue with password</span></div><form onSubmit={submit}>{mode === "signup" && <label>Username<input name="username" autoComplete="username" minLength={3} maxLength={24} required placeholder="Choose a username"/></label>}<label>{mode === "login" ? "Username or email" : "Email address"}<input name={mode === "login" ? "identifier" : "email"} type={mode === "login" ? "text" : "email"} autoComplete={mode === "login" ? "username" : "email"} required placeholder={mode === "login" ? "Username or email" : "you@example.com"}/></label><label>Password<input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required placeholder="At least 8 characters"/></label>{error && <div className="auth-error">{error}</div>}<button className="auth-submit" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}</button></form><p className="auth-switch">{mode === "login" ? "New to Neko Hub?" : "Already have an account?"} <button onClick={()=>switchMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Sign up" : "Log in"}</button></p></section></main>;
}
