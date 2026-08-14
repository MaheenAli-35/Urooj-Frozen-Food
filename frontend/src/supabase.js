import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://msdmrduchrmeruraqcsc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZG1yZHVjaHJtZXJ1cmFxY3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMzkyMzYsImV4cCI6MjEwMTYxNTIzNn0.uDQKlIYHBwv1MiT9pFuTo5B2a6pJ5cxIw2kpYGy95sM";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);