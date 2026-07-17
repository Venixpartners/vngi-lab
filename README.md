# VNGI Lab | The Reverse Engine

The learning platform of the Venix NextGen Initiative (RC 9688595), Lagos, Nigeria.

Every challenge is an AI-generated document with real errors planted inside it:
wrong facts, reversed logic, invented sources, unverifiable claims. Learners
strike through the sentences they do not trust, then check "the back of the
book" to see what they caught, what they missed, and why.

This puts the Initiative's teaching philosophy into software: start with the
expert-level output, then reason backwards until every gap in understanding is
closed.

## Stack

- Next.js 14 (App Router)
- Supabase (Postgres + Row Level Security + Auth) for challenges, attempts, accounts and the leaderboard
- Deployed on Vercel

## Features

- Nine challenges across History, Business, Science, Media Literacy, Digital
  Safety, Financial Literacy, Health Literacy, Coding and Study Skills
- Guest play with a display name, or full accounts with email and password
- Signed-in attempts are linked to the account for progress tracking

## Local development

```bash
npm install
npm run dev
```

Supabase credentials are publishable values set in `lib/supabase.js`, and can be
overridden with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Scoring

- +10 for each planted error correctly struck through
- -3 for striking a sentence that was accurate
- Floor of 0 per attempt; the leaderboard totals each player's best score per challenge

## Roadmap

- Phase 2: AI-generated feedback and dynamic challenge creation
- Phase 3: "Defend Your Work" viva module for capstone certification
- WhatsApp companion for cohort delivery

(c) Venix NextGen Initiative Ltd/Gte. Innovate. Elevate. NextGen.
