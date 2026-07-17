"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Player from "../../../components/Player";

export default function PlayPage({ params }) {
  const router = useRouter();
  const [challenge, setChallenge] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/signin");
        return;
      }
      setUser(data.session.user);
      const { data: row } = await supabase
        .from("challenges")
        .select("id,slug,title,category,difficulty,intro,segments")
        .eq("slug", params.id)
        .eq("active", true)
        .single();
      setChallenge(row || null);
    });
  }, [params.id, router]);

  if (challenge === undefined) {
    return (
      <main className="play-wrap">
        <p className="section-sub">Preparing the document...</p>
      </main>
    );
  }

  if (challenge === null) {
    return (
      <main className="play-wrap">
        <h2 className="section-title">Challenge not found</h2>
        <p className="section-sub">It may have been retired. Head back and pick another.</p>
      </main>
    );
  }

  return <Player challenge={challenge} user={user} />;
}
