import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import type { QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { congregationRecordSchema } from "../congregation-schema.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getClientId } from "../../../supabase/get-client-id.js";

export function createCongregationsCollection(
  supabase: SupabaseClient,
  queryClient: QueryClient,
  congregationId: string | undefined,
) {
  return createCollection(
    queryCollectionOptions({
      queryKey: ["congregations", getClientId(supabase), congregationId ?? null],
      queryFn: async () => {
        // Only root congregations (congregation_id is null) and congregations
        // belonging to the user's selected congregation are relevant. Before
        // onboarding completes congregationId is undefined, so only root
        // congregations are returned — which is what the selection step needs.
        const query = supabase.from("congregation").select("*");
        const filtered = congregationId
          ? query.or(`congregation_id.is.null,congregation_id.eq.${congregationId}`)
          : query.is("congregation_id", null);
        const { data, error } = await filtered;
        if (error) throw error;
        return z.array(congregationRecordSchema).parse(data ?? []);
      },
      queryClient,
      schema: congregationRecordSchema,
      getKey: (congregation) => congregation.id,
      onUpdate: async ({ transaction }) => {
        const partialSchema = congregationRecordSchema.partial();
        for (const mutation of transaction.mutations) {
          const parsed = partialSchema.safeParse(mutation.changes);
          if (!parsed.success) throw parsed.error;
          const payload: Record<string, unknown> = { ...parsed.data };
          // The primary key identifies the row; never write it back
          delete payload.id;
          if (Object.keys(payload).length === 0) continue;
          const { error } = await supabase
            .from("congregation")
            .update(payload)
            .eq("id", mutation.key);
          if (error) throw error;
        }
      },
    }),
  );
}

export type CongregationsCollection = ReturnType<typeof createCongregationsCollection>;
