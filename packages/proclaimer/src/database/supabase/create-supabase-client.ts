import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const clients = new Map<string, SupabaseClient>();

export function createSupabaseClient(supabaseUrl: string, supabaseAnonKey: string): SupabaseClient {
  if (!supabaseUrl || !supabaseUrl.trim()) {
    throw new Error("createSupabaseClient: supabaseUrl is required");
  }
  if (!supabaseAnonKey || !supabaseAnonKey.trim()) {
    throw new Error("createSupabaseClient: supabaseAnonKey is required");
  }
  try {
    new URL(supabaseUrl);
  } catch {
    throw new Error(`createSupabaseClient: supabaseUrl is not a valid URL: "${supabaseUrl}"`);
  }

  const cacheKey = `${supabaseUrl}\n${supabaseAnonKey}`;
  let client = clients.get(cacheKey);
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
    clients.set(cacheKey, client);
  }
  return client;
}
