import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import type { QueryClient } from "@tanstack/react-query";
import type { PublisherRecord } from "./publisher-schema.js";
import type { TypedSupabaseClient } from "../../supabase/create-supabase-client.js";

function createPublishersCollection(supabase: TypedSupabaseClient, queryClient: QueryClient) {
  return createCollection(
    queryCollectionOptions<PublisherRecord>({
      queryKey: ["publishers"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("publisher")
          .select("*")
          .is("archived_at", null);
        if (error) throw error;
        return (data ?? []) as PublisherRecord[];
      },
      queryClient,
      getKey: (publisher) => publisher.id,
    }),
  );
}

export type PublishersCollection = ReturnType<typeof createPublishersCollection>;

let collection: PublishersCollection | null = null;

export function getPublishersCollection(supabase: TypedSupabaseClient, queryClient: QueryClient) {
  if (!collection) {
    collection = createPublishersCollection(supabase, queryClient);
  }
  return collection;
}
