import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createCongregationsCollection,
  type CongregationsCollection,
} from "./create-congregations-collection.js";

const collections = new WeakMap<SupabaseClient, WeakMap<QueryClient, CongregationsCollection>>();

export function getCongregationsCollection(supabase: SupabaseClient, queryClient: QueryClient) {
  let byQueryClient = collections.get(supabase);
  if (!byQueryClient) {
    byQueryClient = new WeakMap();
    collections.set(supabase, byQueryClient);
  }
  let collection = byQueryClient.get(queryClient);
  if (!collection) {
    collection = createCongregationsCollection(supabase, queryClient);
    byQueryClient.set(queryClient, collection);
  }
  return collection;
}
