import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import type { QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { publisherRecordSchema } from "./publisher-schema.js";
import type { TypedSupabaseClient } from "../../supabase/create-supabase-client.js";

let nextClientId = 0;
const clientIds = new WeakMap<TypedSupabaseClient, number>();

function getClientId(supabase: TypedSupabaseClient) {
  let id = clientIds.get(supabase);
  if (id === undefined) {
    id = nextClientId++;
    clientIds.set(supabase, id);
  }
  return id;
}

function createPublishersCollection(supabase: TypedSupabaseClient, queryClient: QueryClient) {
  return createCollection(
    queryCollectionOptions({
      queryKey: ["publishers", getClientId(supabase)],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("publisher")
          .select("*")
          .is("archived_at", null);
        if (error) throw error;
        return z.array(publisherRecordSchema).parse(data ?? []);
      },
      queryClient,
      schema: publisherRecordSchema,
      getKey: (publisher) => publisher.id,
    }),
  );
}

export type PublishersCollection = ReturnType<typeof createPublishersCollection>;

const collections = new WeakMap<TypedSupabaseClient, WeakMap<QueryClient, PublishersCollection>>();

export function getPublishersCollection(supabase: TypedSupabaseClient, queryClient: QueryClient) {
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
