import { createClient } from "@supabase/supabase-js";

// Publishable values (safe to expose; access is governed by Row Level Security).
// Filled in at project setup; can be overridden with env vars.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://geqzqpjczakvdpkydvkf.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable__n897k-S7cYgNBzroiKzAw_jT6G1PVS";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
