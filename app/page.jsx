import AuthCTA from "../components/AuthCTA";

export default function Home() {
  const ticker =
    "Find the errors \u2726 Question the output \u2726 Close the gap \u2726 Reverse Engine \u2726 VNGI Lab \u2726 ";

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
          VNGI Lab is the learning platform of the Venix NextGen Initiative. Inside,
          every document was produced by AI. It looks finished. It reads with
          confidence. And hidden in each one are real errors: wrong facts, reversed
          logic, invented sources. <strong>Your job is to catch them.</strong> That
          is the difference between using AI and understanding it.
        </p>
        <AuthCTA />
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-inner">{ticker + ticker}</div>
      </div>

      <h2 className="section-title">Why the Lab exists</h2>
      <p className="section-sub">
        Anyone can generate an answer now. The Lab trains the judgement to know
        whether the answer deserves your trust.
      </p>

      <div className="cards">
        <div className="card">
          <span className="cat">Objective 01</span>
          <h3>Think before you trust</h3>
          <p>
            Build the habit of verifying AI output instead of accepting it: checking
            facts, testing logic, and asking where a claim actually comes from.
          </p>
        </div>
        <div className="card">
          <span className="cat">Objective 02</span>
          <h3>Learn in reverse</h3>
          <p>
            Start from the expert-level answer and work backwards. Finding what a
            polished document got wrong demands deeper understanding than writing a
            first draft ever does.
          </p>
        </div>
        <div className="card">
          <span className="cat">Objective 03</span>
          <h3>Skills that pay</h3>
          <p>
            Error-spotting, evidence-checking and clear reasoning are exactly what
            employers and clients need in an AI-saturated market. The Lab turns them
            into practice, scores and proof.
          </p>
        </div>
      </div>

      <h2 className="section-title">How a challenge works</h2>
      <p className="section-sub">Three steps. No lectures. The document is the teacher.</p>

      <div className="cards" style={{ paddingBottom: 40 }}>
        <div className="card">
          <span className="cat">Step 1</span>
          <h3>Read the document</h3>
          <p>
            You receive an AI-written passage: a history essay, a business plan, a
            health pamphlet, a code explanation. Somewhere inside it, errors are
            hiding.
          </p>
        </div>
        <div className="card">
          <span className="cat">Step 2</span>
          <h3>Strike what you doubt</h3>
          <p>
            Click through the document like an examiner with a marker pen, striking
            every sentence you would not defend. Precision matters: wrong strikes
            cost points.
          </p>
        </div>
        <div className="card">
          <span className="cat">Step 3</span>
          <h3>Check the back of the book</h3>
          <p>
            See what you caught, what slipped past you, and why each planted error
            fools people. Your score joins the leaderboard, and every mistake
            teaches.
          </p>
        </div>
      </div>

      <section className="joinband">
        <h2 className="section-title" style={{ margin: "0 0 8px" }}>
          Ready to examine the machine?
        </h2>
        <p className="section-sub" style={{ marginBottom: 18 }}>
          Create a free account to enter the Lab. Nine challenges are waiting, from
          scam-spotting to code review.
        </p>
        <AuthCTA />
      </section>
    </main>
  );
}
