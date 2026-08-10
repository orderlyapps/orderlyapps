import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createCongregationsCollection,
  type CongregationsCollection,
} from "./create-congregations-collection.js";

const collections = new WeakMap<
  SupabaseClient,
  WeakMap<QueryClient, Map<string, CongregationsCollection>>
>();

export function getCongregationsCollection(
  supabase: SupabaseClient,
  queryClient: QueryClient,
  congregationId: string | undefined,
) {
  let byQueryClient = collections.get(supabase);
  if (!byQueryClient) {
    byQueryClient = new WeakMap();
    collections.set(supabase, byQueryClient);
  }
  let byCongregationId = byQueryClient.get(queryClient);
  if (!byCongregationId) {
    byCongregationId = new Map();
    byQueryClient.set(queryClient, byCongregationId);
  }
  const cacheKey = congregationId ?? "";
  let collection = byCongregationId.get(cacheKey);
  if (!collection) {
    collection = createCongregationsCollection(supabase, queryClient, congregationId);
    byCongregationId.set(cacheKey, collection);
  }
  return collection;
}
