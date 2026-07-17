"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    localStorage.removeItem("vngi_name");
  }

  if (!ready) return <span className="usermenu" />;

  if (!user) {
    return (
      <Link href="/signin" className="usermenu-link">
        Sign in
      </Link>
    );
  }

  const name =
    user.user_metadata?.display_name || (user.email || "").split("@")[0];

  return (
    <span className="usermenu">
      <span className="usermenu-name" title={user.email}>
        {name}
      </span>
      <button className="usermenu-out" onClick={signOut}>
        Sign out
      </button>
    </span>
  );
}
