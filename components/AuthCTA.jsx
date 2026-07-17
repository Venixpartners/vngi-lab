"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function AuthCTA() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="cta-row" />;

  if (user) {
    return (
      <div className="cta-row">
        <Link href="/challenges" className="btn">
          Enter the Lab
        </Link>
        <Link href="/leaderboard" className="btn ghost">
          View leaderboard
        </Link>
      </div>
    );
  }

  return (
    <div className="cta-row">
      <Link href="/signin?mode=signup" className="btn">
        Create a free account
      </Link>
      <Link href="/signin" className="btn ghost">
        Sign in
      </Link>
    </div>
  );
}
