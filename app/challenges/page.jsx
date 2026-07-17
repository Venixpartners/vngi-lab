"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const WEEK_TITLES = {
  1: "From Using to Understanding AI",
  2: "What Intelligent AI Use Actually Looks Like",
  3: "Applying the Framework Across Fields",
};

export default function Challenges() {
  const router = useRouter();
  const [challenges, setChallenges] = useState(null);
  const [best, setBest] = useState({});
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/signin");
        return;
      }
      setChecking(false);
      const [{ data: rows }, { data: attempts }] = await Promise.all([
        supabase
          .from("challenges")
          .select("id,slug,title,category,difficulty,intro,error_count,week,track,is_gap_test")
          .eq("active", true)
          .order("week", { ascending: true })
          .order("sort", { ascending: true }),
        supabase
          .from("attempts")
          .select("challenge_id,score,max_score")
          .eq("user_id", data.session.user.id),
      ]);
      setChallenges(rows || []);
      const map = {};
      (attempts || []).forEach((a) => {
        if (!map[a.challenge_id] || a.score > map[a.challenge_id].score) {
          map[a.challenge_id] = { score: a.score, max: a.max_score };
        }
      });
      setBest(map);
    });
  }, [router]);

  if (checking || challenges === null) {
    return (
      <main className="play-wrap">
        <p className="section-sub">Opening the Lab...</p>
      </main>
    );
  }

  const gap = challenges.find((c) => c.is_gap_test);
  const regular = challenges.filter((c) => !c.is_gap_test);
  const gapDone = gap && best[gap.id];
  const completed = regular.filter((c) => best[c.id]).length;

  const weeks = {};
  regular.forEach((c) => {
    (weeks[c.week] = weeks[c.week] || []).push(c);
  });

  return (
    <main>
      <section className="hero" style={{ paddingBottom: 10 }}>
        <p className="eyebrow">VNGI Lab | The Reverse Engine</p>
        <h1 style={{ fontSize: "clamp(38px,7vw,72px)" }}>
          Your <em>journey</em>
        </h1>
        <p className="lede">
          The Lab follows the four week Venix NextGen programme. Take the Gap Test
          first, then work through the weeks. Strike through every sentence you do
          not trust, and check the back of the book.
        </p>
        <p className="progress-strip">
          {gapDone ? (
            <>Gap Test baseline: <strong>{best[gap.id].score}/{best[gap.id].max}</strong> &nbsp;|&nbsp; </>
          ) : null}
          Challenges completed: <strong>{completed} of {regular.length}</strong>
        </p>
      </section>

      {gap && !gapDone && (
        <section className="gapband">
          <span className="cat">Start here | Your baseline</span>
          <h3>{gap.title}</h3>
          <p>{gap.intro}</p>
          <Link href={`/play/${gap.slug}`} className="btn" style={{ marginTop: 12 }}>
            Take the Gap Test
          </Link>
        </section>
      )}

      {Object.keys(weeks)
        .sort()
        .map((w) => (
          <section key={w}>
            <h2 className="section-title">
              Week {w} <span className="week-sub">| {WEEK_TITLES[w] || ""}</span>
            </h2>
            <div className="cards" style={{ paddingBottom: 34 }}>
              {weeks[w].map((c) => (
                <Link key={c.slug} href={`/play/${c.slug}`} className="card">
                  <span className="cat">{c.track} | {c.category}</span>
                  <h3>{c.title}</h3>
                  <p>{c.intro.length > 150 ? c.intro.slice(0, 147) + "..." : c.intro}</p>
                  <span className="meta">
                    <span>{c.difficulty}</span>
                    <span>
                      {best[c.id]
                        ? `Best: ${best[c.id].score}/${best[c.id].max}`
                        : `${c.error_count} errors hidden`}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

      {gap && gapDone && (
        <p className="section-sub" style={{ paddingBottom: 60 }}>
          Want to retake the Gap Test? <Link href={`/play/${gap.slug}`} style={{ color: "var(--blue)", textDecoration: "underline" }}>It is always open</Link>; your best score stands as your baseline.
        </p>
      )}
    </main>
  );
}
