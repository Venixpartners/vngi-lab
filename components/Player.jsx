"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const POINTS_PER_ERROR = 10;
const FALSE_FLAG_PENALTY = 3;

export default function Player({ challenge, user }) {
  const segments = challenge.segments || [];
  const errorIds = useMemo(
    () => new Set(segments.filter((s) => s.is_error).map((s) => s.id)),
    [segments]
  );
  const maxScore = errorIds.size * POINTS_PER_ERROR;

  const name =
    user?.user_metadata?.display_name ||
    (user?.email || "Examiner").split("@")[0].slice(0, 24);
  const [flags, setFlags] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  function toggleFlag(id) {
    if (submitted) return;
    setFlags((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function submit() {
    const found = [...flags].filter((id) => errorIds.has(id)).length;
    const falseFlags = [...flags].filter((id) => !errorIds.has(id)).length;
    const missed = errorIds.size - found;
    const score = Math.max(
      0,
      found * POINTS_PER_ERROR - falseFlags * FALSE_FLAG_PENALTY
    );
    const r = { found, missed, falseFlags, score };
    setResult(r);
    setSubmitted(true);
    setSaving(true);
    try {
      const { error } = await supabase.from("attempts").insert({
        challenge_id: challenge.id,
        player_name: name,
        score,
        max_score: maxScore,
        found,
        missed,
        false_flags: falseFlags,
        user_id: user.id,
      });
      setSaveState(error ? "error" : "saved");
    } catch (e) {
      setSaveState("error");
    } finally {
      setSaving(false);
    }
  }

  function segClass(s) {
    if (!submitted) return flags.has(s.id) ? "seg flagged" : "seg";
    if (s.is_error && flags.has(s.id)) return "seg hit";
    if (s.is_error && !flags.has(s.id)) return "seg miss";
    if (!s.is_error && flags.has(s.id)) return "seg false-flag";
    return "seg";
  }

  const reviewItems = submitted
    ? segments.filter((s) => s.is_error || flags.has(s.id))
    : [];

  return (
    <main className="play-wrap">
      <p className="eyebrow">
        {challenge.category} | {challenge.difficulty}
      </p>
      <h1 className="section-title" style={{ margin: "6px 0 0" }}>
        {challenge.title}
      </h1>
      <p className="brief">{challenge.intro}</p>

      <>
          <div className="paper">
            <div className="paper-head">
              <span>AI-generated document</span>
              <span>Examiner: {name}</span>
            </div>
            <p>
              {segments.map((s) => (
                <span key={s.id}>
                  <span
                    role="button"
                    tabIndex={submitted ? -1 : 0}
                    className={segClass(s)}
                    onClick={() => toggleFlag(s.id)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      (e.preventDefault(), toggleFlag(s.id))
                    }
                    aria-pressed={flags.has(s.id)}
                  >
                    {s.text}
                  </span>{" "}
                </span>
              ))}
            </p>
          </div>

          {!submitted && (
            <div className="play-actions">
              <button className="btn" onClick={submit} disabled={flags.size === 0}>
                Check the back of the book
              </button>
              <span className="flag-count">
                {flags.size} sentence{flags.size === 1 ? "" : "s"} struck through
              </span>
            </div>
          )}

          {submitted && result && (
            <section className="backbook" aria-live="polite">
              <h2>The back of the book</h2>
              <p className="scoreline">
                <strong>
                  {result.score} / {maxScore}
                </strong>{" "}
                &nbsp;|&nbsp; {result.found} caught, {result.missed} missed,{" "}
                {result.falseFlags} wrongly struck
                {saving
                  ? " | saving score..."
                  : saveState === "saved"
                  ? " | score saved"
                  : saveState === "error"
                  ? " | score could not be saved (connection issue), but your result stands"
                  : ""}
              </p>
              <div className="explain">
                {reviewItems.map((s) => {
                  const state = s.is_error
                    ? flags.has(s.id)
                      ? "hit"
                      : "miss"
                    : "false-flag";
                  const label =
                    state === "hit"
                      ? "Caught it"
                      : state === "miss"
                      ? "You missed this one"
                      : "This one was actually fine";
                  return (
                    <div className="item" key={s.id}>
                      <span className={`tag ${state}`}>
                        {label}
                        {s.error_type ? ` | ${s.error_type}` : ""}
                      </span>
                      <span className="quote">"{s.text}"</span>
                      {s.explanation ||
                        "This sentence is accurate. Striking correct material costs points: precision matters as much as suspicion."}
                    </div>
                  );
                })}
              </div>
              <div className="play-actions">
                <Link href="/challenges" className="btn">
                  Next challenge
                </Link>
                <Link href="/leaderboard" className="btn ghost">
                  View leaderboard
                </Link>
              </div>
            </section>
          )}
        </>
    </main>
  );
}
