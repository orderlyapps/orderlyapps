import type { SupabaseClient } from "@supabase/supabase-js";

let nextClientId = 0;
const clientIds = new WeakMap<SupabaseClient, number>();

export function getClientId(supabase: SupabaseClient) {
  let id = clientIds.get(supabase);
  if (id === undefined) {
    id = nextClientId++;
    clientIds.set(supabase, id);
  }
  return id;
}
