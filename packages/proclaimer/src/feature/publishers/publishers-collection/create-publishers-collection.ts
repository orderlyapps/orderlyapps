import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import type { QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { publisherRecordSchema } from "../publisher-schema.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getClientId } from "../../../supabase/get-client-id.js";

export function createPublishersCollection(supabase: SupabaseClient, queryClient: QueryClient) {
  return createCollection(
    queryCollectionOptions({
      queryKey: ["publishers", getClientId(supabase)],
      queryFn: async () => {
        const { data, error } = await supabase.from("publisher").select("*");
        if (error) throw error;
        return z.array(publisherRecordSchema).parse(data ?? []);
      },
      queryClient,
      schema: publisherRecordSchema,
      getKey: (publisher) => publisher.id,
      onUpdate: async ({ transaction }) => {
        const partialSchema = publisherRecordSchema.partial();
        for (const mutation of transaction.mutations) {
          const parsed = partialSchema.safeParse(mutation.changes);
          if (!parsed.success) throw parsed.error;
          const payload: Record<string, unknown> = { ...parsed.data };
          // The primary key identifies the row; never write it back
          delete payload.id;
          if (Object.keys(payload).length === 0) continue;
          const { error } = await supabase.from("publisher").update(payload).eq("id", mutation.key);
          if (error) throw error;
        }
      },
    }),
  );
}

export type PublishersCollection = ReturnType<typeof createPublishersCollection>;
