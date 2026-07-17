"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const RANKS = [
  { min: 0, name: "New Examiner" },
  { min: 50, name: "Junior Examiner" },
  { min: 120, name: "Field Examiner" },
  { min: 200, name: "Senior Examiner" },
  { min: 280, name: "Chief Examiner" },
];

function rankFor(points) {
  let current = RANKS[0];
  let next = null;
  for (const r of RANKS) {
    if (points >= r.min) current = r;
    else { next = r; break; }
  }
  return { current, next };
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [attempts, setAttempts] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [name, setName] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.replace("/signin"); return; }
      const u = data.session.user;
      setUser(u);
      setName(u.user_metadata?.display_name || "");
      const [{ data: at }, { data: ch }] = await Promise.all([
        supabase
          .from("attempts")
          .select("id,challenge_id,score,max_score,found,missed,false_flags,created_at")
          .eq("user_id", u.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("challenges")
          .select("id,slug,title,week,is_gap_test,error_count")
          .eq("active", true),
      ]);
      setAttempts(at || []);
      setChallenges(ch || []);
    });
  }, [router]);

  if (!user || attempts === null || challenges === null) {
    return (
      <main className="play-wrap">
        <p className="section-sub">Opening your profile...</p>
      </main>
    );
  }

  const byId = Object.fromEntries(challenges.map((c) => [c.id, c]));
  const best = {};
  attempts.forEach((a) => {
    if (!best[a.challenge_id] || a.score > best[a.challenge_id].score) best[a.challenge_id] = a;
  });

  const gap = challenges.find((c) => c.is_gap_test);
  const gapBest = gap ? best[gap.id] : null;
  const regular = challenges.filter((c) => !c.is_gap_test);
  const completedIds = regular.filter((c) => best[c.id]).map((c) => c.id);
  const totalPoints = Object.values(best).reduce((s, a) => s + a.score, 0);
  const { current, next } = rankFor(totalPoints);

  const weekDone = (w) => {
    const inWeek = regular.filter((c) => c.week === w);
    return inWeek.length > 0 && inWeek.every((c) => best[c.id]);
  };
  const badges = [
    { key: "baseline", label: "Baseline Set", desc: "Completed the Gap Test", earned: !!gapBest },
    { key: "first", label: "First Catch", desc: "Completed your first challenge", earned: completedIds.length >= 1 },
    { key: "clean", label: "Clean Sweep", desc: "A perfect score on any challenge", earned: Object.values(best).some((a) => a.max_score > 0 && a.score === a.max_score) },
    { key: "w1", label: "Week 1 Cleared", desc: "Every Week 1 challenge completed", earned: weekDone(1) },
    { key: "w2", label: "Week 2 Cleared", desc: "Every Week 2 challenge completed", earned: weekDone(2) },
    { key: "w3", label: "Week 3 Cleared", desc: "Every Week 3 challenge completed", earned: weekDone(3) },
    { key: "full", label: "Full House", desc: "Every challenge in the library completed", earned: regular.length > 0 && completedIds.length === regular.length },
  ];

  async function saveName() {
    const trimmed = name.trim().slice(0, 24);
    if (!trimmed) { setSaveMsg("Display name cannot be empty."); return; }
    setSavingName(true);
    setSaveMsg("");
    try {
      const { error: e1 } = await supabase.auth.updateUser({ data: { display_name: trimmed } });
      const { error: e2 } = await supabase
        .from("attempts")
        .update({ player_name: trimmed })
        .eq("user_id", user.id);
      setSaveMsg(e1 || e2 ? "Could not save right now; try again." : "Saved. Your name is updated everywhere, including the leaderboard.");
    } catch {
      setSaveMsg("Could not save right now; try again.");
    } finally {
      setSavingName(false);
    }
  }

  return (
    <main className="play-wrap profile-wrap">
      <Link href="/challenges" className="backlink">&larr; Back to your journey</Link>
      <p className="eyebrow">VNGI Lab | Examiner profile</p>
      <h1 className="section-title" style={{ margin: "6px 0 4px" }}>{name || "Examiner"}</h1>
      <p className="ranktitle">
        {current.name}
        {next
          ? ` | ${next.min - totalPoints} points to ${next.name}`
          : " | Top rank reached"}
      </p>

      <div className="stat-tiles">
        <div className="tile">
          <span className="tile-num">{gapBest ? `${gapBest.score}/${gapBest.max_score}` : "Not set"}</span>
          <span className="tile-label">Gap Test baseline</span>
        </div>
        <div className="tile">
          <span className="tile-num">{completedIds.length}/{regular.length}</span>
          <span className="tile-label">Challenges completed</span>
        </div>
        <div className="tile">
          <span className="tile-num">{totalPoints}</span>
          <span className="tile-label">Total points (best scores)</span>
        </div>
        <div className="tile">
          <span className="tile-num">{attempts.length}</span>
          <span className="tile-label">Attempts made</span>
        </div>
      </div>

      <h2 className="profile-h2">Badges</h2>
      <div className="badge-grid">
        {badges.map((b) => (
          <div key={b.key} className={b.earned ? "badge earned" : "badge"}>
            <span className="badge-name">{b.label}</span>
            <span className="badge-desc">{b.earned ? b.desc : `Locked | ${b.desc}`}</span>
          </div>
        ))}
      </div>

      <h2 className="profile-h2">Display name</h2>
      <div className="namerow">
        <input
          className="field"
          value={name}
          maxLength={24}
          onChange={(e) => setName(e.target.value)}
          aria-label="Display name"
        />
        <button className="btn" onClick={saveName} disabled={savingName}>
          {savingName ? "Saving..." : "Save name"}
        </button>
      </div>
      {saveMsg && <p className="section-sub" style={{ paddingTop: 8 }}>{saveMsg}</p>}
      <p className="section-sub" style={{ paddingTop: 4 }}>
        Signed in as {user.email}. This name appears on the public leaderboard.
      </p>

      <h2 className="profile-h2">Attempt history</h2>
      {attempts.length === 0 ? (
        <p className="section-sub">No attempts yet. Your record starts with the Gap Test.</p>
      ) : (
        <div className="history">
          {attempts.slice(0, 20).map((a) => (
            <div className="hrow" key={a.id}>
              <span className="htitle">{byId[a.challenge_id]?.title || "Challenge"}</span>
              <span className="hscore">{a.score}/{a.max_score}</span>
              <span className="hmeta">
                {a.found} caught, {a.missed} missed, {a.false_flags} wrongly struck
              </span>
              <span className="hdate">
                {new Date(a.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
