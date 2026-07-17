import { supabase } from "../../../lib/supabase";
import Player from "../../../components/Player";

export const revalidate = 60;

export default async function PlayPage({ params }) {
  const { data: challenge } = await supabase
    .from("challenges")
    .select("id,slug,title,category,difficulty,intro,segments")
    .eq("slug", params.id)
    .eq("active", true)
    .single();

  if (!challenge) {
    return (
      <main className="play-wrap">
        <h2 className="section-title">Challenge not found</h2>
        <p className="section-sub">It may have been retired. Head back and pick another.</p>
      </main>
    );
  }

  return <Player challenge={challenge} />;
}
