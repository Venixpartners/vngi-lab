"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Challenges() {
  const router = useRouter();
  const [challenges, setChallenges] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/signin");
        return;
      }
      setChecking(false);
      const { data: rows } = await supabase
        .from("challenges")
        .select("slug,title,category,difficulty,intro,error_count")
        .eq("active", true)
        .order("sort", { ascending: true });
      setChallenges(rows || []);
    });
  }, [router]);

  if (checking) {
    return (
      <main className="play-wrap">
        <p className="section-sub">Opening the Lab...</p>
      </main>
    );
  }

  return (
    <main>
      <section className="hero" style={{ paddingBottom: 10 }}>
        <p className="eyebrow">VNGI Lab | The Reverse Engine</p>
        <h1 style={{ fontSize: "clamp(38px,7vw,72px)" }}>
          Choose a <em>challenge</em>
        </h1>
        <p className="lede">
          Read the passage. Strike through every sentence you do not trust. Then
          check the back of the book.
        </p>
      </section>

      <div className="cards" style={{ paddingTop: 24 }}>
        {challenges === null && <p className="section-sub">Loading challenges...</p>}
        {(challenges || []).map((c) => (
          <Link key={c.slug} href={`/play/${c.slug}`} className="card">
            <span className="cat">{c.category}</span>
            <h3>{c.title}</h3>
            <p>{c.intro}</p>
            <span className="meta">
              <span>{c.difficulty}</span>
              <span>{c.error_count} errors hidden</span>
            </span>
          </Link>
        ))}
        {challenges && challenges.length === 0 && (
          <p className="section-sub">
            No challenges are available right now. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
