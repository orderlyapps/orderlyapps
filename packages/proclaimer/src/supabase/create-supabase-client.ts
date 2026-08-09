import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const clients = new Map<string, SupabaseClient>();

export function createSupabaseClient(supabaseUrl: string, supabaseAnonKey: string): SupabaseClient {
  const cacheKey = `${supabaseUrl}\n${supabaseAnonKey}`;
  let client = clients.get(cacheKey);
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
    clients.set(cacheKey, client);
  }
  return client;
}
