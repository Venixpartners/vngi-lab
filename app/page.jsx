import Link from "next/link";
import { supabase } from "../lib/supabase";

export const revalidate = 60;

export default async function Home() {
  const { data: challenges } = await supabase
    .from("challenges")
    .select("slug,title,category,difficulty,intro,error_count")
    .eq("active", true)
    .order("sort", { ascending: true });

  const ticker =
    "Find the errors ✦ Question the output ✦ Close the gap ✦ Reverse Engine ✦ VNGI Lab ✦ ";

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Venix NextGen Initiative | The Reverse Engine</p>
        <h1>
          The answer is written.
          <br />
          <em>Find what it got wrong.</em>
        </h1>
        <p className="lede">
          Every passage below was produced by AI. It looks finished. It reads with
          confidence. And hidden inside each one are real errors: wrong facts,
          reversed logic, invented sources. <strong>Your job is to catch them.</strong>{" "}
          That is the difference between using AI and understanding it.
        </p>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-inner">{ticker + ticker}</div>
      </div>

      <h2 className="section-title">Choose a challenge</h2>
      <p className="section-sub">
        Read the passage. Strike through every sentence you do not trust. Then check
        the back of the book.
      </p>

      <div className="cards">
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
        {(!challenges || challenges.length === 0) && (
          <p className="section-sub">
            Challenges are loading. If this persists, the database seed has not run yet.
          </p>
        )}
      </div>
    </main>
  );
}
