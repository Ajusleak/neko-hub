"use client";
import { useEffect, useState } from "react";
type User={id:string;username:string;email:string;provider:string};
export default function ProfilePage(){
  const[user,setUser]=useState<User|null|undefined>(undefined);
  useEffect(()=>{fetch("/api/auth/me").then(r=>r.json()).then(r=>setUser(r.user)).catch(()=>setUser(null))},[]);
  async function logout(){await fetch("/api/auth/logout",{method:"POST"});window.location.href="/"}
  if(user===undefined)return <main className="profile-page"><div className="profile-loading">Loading profile…</div></main>;
  if(!user)return <main className="profile-page"><section className="profile-card signed-out"><div className="profile-fox fox-idle">🦊</div><small>COLLECTOR PROFILE</small><h1>You&apos;re not signed in.</h1><p>Sign in to keep your collections, wishlist, locker, and recommendations connected to you.</p><div className="profile-actions"><a href="/login">Log In</a><a className="primary" href="/login?mode=signup">Sign Up</a></div></section></main>;
  const initials=user.username.slice(0,2).toUpperCase();
  return <main className="profile-page"><a className="auth-back" href="/">← Back to Neko Hub</a><section className="profile-card"><div className="profile-heading"><div className="profile-avatar">{initials}</div><div><small>COLLECTOR PROFILE</small><h1>{user.username}</h1><p>{user.email}</p></div><span className="account-badge">{user.provider === "google" ? "Google account" : "Neko account"}</span></div><div className="profile-grid"><article><small>COLLECTION</small><b>0</b><span>Cosmetics tracked</span></article><article><small>WISHLIST</small><b>0</b><span>Items watched</span></article><article><small>ACCOUNT STATUS</small><b>Active</b><span>Ready to sync</span></article></div><div className="profile-details"><h2>Account details</h2><dl><div><dt>Username</dt><dd>{user.username}</dd></div><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Sign-in method</dt><dd>{user.provider === "google" ? "Google" : "Username and password"}</dd></div><div><dt>Member ID</dt><dd>{user.id.slice(0,8).toUpperCase()}</dd></div></dl></div><button className="logout-button" onClick={logout}>Log out</button></section></main>;
}
