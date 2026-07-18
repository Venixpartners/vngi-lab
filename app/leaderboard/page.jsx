import { supabase } from "../../lib/supabase";

export const revalidate = 30;

export default async function Leaderboard() {
  const { data } = await supabase
    .from("leaderboard")
    .select("player_name,total_score,challenges_played,last_played")
    .order("total_score", { ascending: false })
    .limit(50);

  return (
    <main>
      <section className="hero" style={{ paddingBottom: 10 }}>
        <p className="eyebrow">VNGI Lab | Standings</p>
        <h1 style={{ fontSize: "clamp(38px,7vw,72px)" }}>
          Leader<em>board</em>
        </h1>
        <p className="lede">
          Best score per challenge, totalled. Precision beats suspicion: wrong
          strikes cost points.
        </p>
      </section>

      <div className="board-scroll">
      <table className="board">
        <thead>
          <tr>
            <th>#</th>
            <th>Examiner</th>
            <th>Total score</th>
            <th>Challenges</th>
          </tr>
        </thead>
        <tbody>
          {(data || []).map((row, i) => (
            <tr key={row.player_name}>
              <td className="rank">{i + 1}</td>
              <td>{row.player_name}</td>
              <td>{row.total_score}</td>
              <td>{row.challenges_played}</td>
            </tr>
          ))}
          {(!data || data.length === 0) && (
            <tr>
              <td colSpan={4} style={{ color: "var(--slate)" }}>
                No scores yet. Be the first: pick a challenge and start striking.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </main>
  );
}
