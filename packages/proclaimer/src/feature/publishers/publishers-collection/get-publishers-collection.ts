import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createPublishersCollection,
  type PublishersCollection,
} from "./create-publishers-collection.js";

const collections = new WeakMap<SupabaseClient, WeakMap<QueryClient, PublishersCollection>>();

export function getPublishersCollection(supabase: SupabaseClient, queryClient: QueryClient) {
  let byQueryClient = collections.get(supabase);
  if (!byQueryClient) {
    byQueryClient = new WeakMap();
    collections.set(supabase, byQueryClient);
  }
  let collection = byQueryClient.get(queryClient);
  if (!collection) {
    collection = createPublishersCollection(supabase, queryClient);
    byQueryClient.set(queryClient, collection);
  }
  return collection;
}
