import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient;

export function createSupabaseClient(
  supabaseUrl: string,
  supabaseAnonKey: string,
): TypedSupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey);
}
