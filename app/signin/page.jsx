"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignIn() {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  async function submit() {
    setNotice(null);
    if (!email.includes("@")) return setNotice({ kind: "err", text: "Enter a valid email address." });
    if (password.length < 6) return setNotice({ kind: "err", text: "Password needs at least 6 characters." });
    if (mode === "signup" && displayName.trim().length < 2)
      return setNotice({ kind: "err", text: "Choose a display name of at least 2 characters." });

    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName.trim().slice(0, 24) } },
        });
        if (error) throw error;
        if (data.session) {
          localStorage.setItem("vngi_name", displayName.trim().slice(0, 24));
          router.push("/");
        } else {
          setNotice({
            kind: "ok",
            text: "Account created. Check your email for a confirmation link, then sign in here.",
          });
          setMode("signin");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const name =
          data.user?.user_metadata?.display_name || email.split("@")[0].slice(0, 24);
        localStorage.setItem("vngi_name", name);
        router.push("/");
      }
    } catch (e) {
      setNotice({ kind: "err", text: e.message || "Something went wrong. Try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="play-wrap" style={{ maxWidth: 460 }}>
      <p className="eyebrow">VNGI Lab | Account</p>
      <h1 className="section-title" style={{ margin: "6px 0 14px" }}>
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="section-sub">
        {mode === "signin"
          ? "Welcome back, examiner. Your scores are waiting."
          : "One account, every challenge, one leaderboard name."}
      </p>

      <div className="authform">
        {mode === "signup" && (
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name (shown on leaderboard)"
            maxLength={24}
            aria-label="Display name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          aria-label="Email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Password"
          type="password"
          aria-label="Password"
        />
        <button className="btn" onClick={submit} disabled={busy}>
          {busy ? "One moment..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </div>

      {notice && (
        <p className={`authnotice ${notice.kind}`} role="status">
          {notice.text}
        </p>
      )}

      <p className="authswitch">
        {mode === "signin" ? (
          <>
            New here?{" "}
            <button onClick={() => { setMode("signup"); setNotice(null); }}>
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => { setMode("signin"); setNotice(null); }}>
              Sign in
            </button>
          </>
        )}
      </p>
      <p className="authswitch" style={{ marginTop: 6 }}>
        Or continue as a guest: just pick a challenge and enter a display name.
      </p>
    </main>
  );
}
