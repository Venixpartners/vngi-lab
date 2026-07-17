export const metadata = {
  title: "Policies | VNGI Lab",
  description:
    "Privacy, terms of use, safeguarding and responsible AI commitments for VNGI Lab, the learning platform of the Venix NextGen Initiative.",
};

export default function Policies() {
  return (
    <main className="policy-wrap">
      <section className="hero" style={{ paddingBottom: 16 }}>
        <p className="eyebrow">VNGI Lab | Trust and Safety</p>
        <h1 style={{ fontSize: "clamp(38px,7vw,72px)" }}>
          Our <em>policies</em>
        </h1>
        <p className="lede">
          VNGI Lab is operated by the Venix NextGen Initiative Ltd/Gte (RC 9688595),
          a not-for-profit company registered in Lagos, Nigeria. These policies
          explain how we handle your information, what we expect of everyone using
          the Lab, and how we keep young learners safe. Effective 17 July 2026.
        </p>
        <nav className="policy-toc" aria-label="Policy sections">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms of Use</a>
          <a href="#safeguarding">Safeguarding</a>
          <a href="#ai-ethics">Responsible AI</a>
        </nav>
      </section>

      <section id="privacy" className="policy-section">
        <h2>1. Privacy Policy</h2>
        <h3>What we collect</h3>
        <p>
          When you create an account we collect your display name, your email
          address, and a password, which is stored only in securely hashed form.
          When you play challenges we record your attempts: which challenge, your
          score, and how many errors you caught, missed or wrongly struck. That is
          the whole list. The Lab has no payments, collects no financial
          information, and uses no advertising trackers. The only data kept in your
          browser is what is needed to keep you signed in.
        </p>
        <h3>Who is responsible for your data</h3>
        <p>
          The Venix NextGen Initiative is the data controller for all learner data,
          in line with the Nigeria Data Protection Act, 2023. The platform is
          maintained under a written agreement with Venix Partners Limited, which
          may process data only on the Initiative's instructions and may not use it
          for any purpose of its own. Data is hosted on Supabase (in the United
          Kingdom) and served through Vercel.
        </p>
        <h3>How your data is used</h3>
        <p>
          Your email address is used to operate your account. Your display name and
          best scores appear on the public leaderboard; your email address never
          does. The Initiative uses aggregated, anonymised results, such as average
          Gap Test baselines and improvement across a cohort, to measure and report
          the impact of its programmes to its board and to funders. No personal
          data is ever sold, and it is not shared with third parties except the
          hosting providers named above or where the law requires it.
        </p>
        <h3>Your rights</h3>
        <p>
          You can ask to see the data we hold about you, correct it, change your
          display name, or delete your account and its records entirely. Write to
          programme@venixnextgen.org and we will act on your request. We keep
          account data only for as long as your account exists.
        </p>
      </section>

      <section id="terms" className="policy-section">
        <h2>2. Terms of Use</h2>
        <p>
          The Lab is free to use for learning. By creating an account you agree to
          the following, which exist to keep the platform fair and useful for
          everyone.
        </p>
        <p>
          <strong>Be yourself.</strong> Use a display name you are happy for other
          learners to see, and nothing offensive, misleading or impersonating
          someone else. One account per person; do not share your password.
        </p>
        <p>
          <strong>Play fairly.</strong> Scores exist to measure judgement, not to
          be gamed. Do not attempt to bypass the platform's security, extract
          challenge answers by technical means, use automated tools to submit
          attempts, or interfere with other learners' use of the Lab.
        </p>
        <p>
          <strong>Respect the content.</strong> Challenges, explanations and other
          materials belong to the Venix NextGen Initiative, and the platform
          software is used under agreement with Venix Partners Limited. You may use
          everything here for your own learning, and facilitators may use it in
          Initiative programmes. Republishing or commercial use requires written
          permission.
        </p>
        <p>
          <strong>An important warning about challenge content.</strong> The
          documents inside challenges deliberately contain false statements. That
          is the whole method: you learn by finding them. Never rely on a challenge
          passage as a source of facts, and never quote one outside the Lab as if
          it were true. The accurate information lives in the explanations at the
          back of the book.
        </p>
        <p>
          We may suspend or remove accounts that break these terms, and remove
          leaderboard entries produced by unfair play. The Lab is provided as is;
          we work to keep it available and correct, but as a free educational
          service we cannot promise uninterrupted operation. These terms are
          governed by the laws of the Federal Republic of Nigeria.
        </p>
      </section>

      <section id="safeguarding" className="policy-section">
        <h2>3. Safeguarding Statement</h2>
        <p>
          The Initiative works with young people, including minors, and their
          protection comes before every other consideration. That commitment,
          set out in our governing documents, applies fully to the Lab.
        </p>
        <p>
          If you are under 18, you should use the Lab with the knowledge and
          consent of a parent or guardian, ideally as part of a school or cohort
          programme with a facilitator. The platform collects the minimum
          information needed to run, displays only chosen display names publicly,
          and contains no messaging or chat between users, which removes the most
          common channel of online risk.
        </p>
        <p>
          Facilitators and volunteers are expected to follow the Initiative's
          safeguarding and code of conduct requirements at all times, in live
          sessions and online. We never feature a participant's name, image or work
          in our communications without consent, and for minors, without guardian
          consent.
        </p>
        <p>
          If anything connected with the Lab or an Initiative programme makes you
          or a young person feel unsafe, or you believe these standards have been
          breached, report it to programme@venixnextgen.org. Reports are treated
          seriously, confidentially, and without retaliation against anyone who
          raises a concern in good faith.
        </p>
      </section>

      <section id="ai-ethics" className="policy-section">
        <h2>4. Responsible AI Statement</h2>
        <p>
          The Lab exists to teach responsible AI use, so it must practise what it
          teaches. Drawing on the Initiative's Risk and Ethics Policy, we commit to
          the following.
        </p>
        <p>
          <strong>Honesty about AI.</strong> We teach that AI output can be
          confidently wrong, that it can reflect bias in the material it learned
          from, and that responsibility for its use always rests with people. Every
          challenge in the Lab is built on that truth.
        </p>
        <p>
          <strong>Fairness and inclusion.</strong> Challenge content is written to
          be relevant to Nigerian and African learners, reviewed for stereotypes
          and bias, and made available free of charge. We welcome corrections: if
          you believe any challenge contains an unintended error or unfair
          framing, tell us at programme@venixnextgen.org and we will review it.
        </p>
        <p>
          <strong>Transparency.</strong> Passages presented in challenges are
          AI-generated or AI-styled by design and are labelled as such. Planted
          errors are always revealed, with explanations, after every attempt.
          Nothing in the Lab pretends to be something it is not.
        </p>
        <p>
          <strong>Privacy by restraint.</strong> The most reliable way to protect
          data is to collect little of it. The Lab follows that principle, as
          described in the Privacy Policy above.
        </p>
      </section>

      <p className="policy-foot">
        Questions about any of these policies: programme@venixnextgen.org. Venix
        NextGen Initiative Ltd/Gte (RC 9688595), 35 Yesufu Sanusi Street, Surulere,
        Lagos, Nigeria. These policies may be updated as the Lab grows; the
        effective date above will change when they are.
      </p>
    </main>
  );
}
