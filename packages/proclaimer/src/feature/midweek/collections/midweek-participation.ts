import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { midweekParticipationSchema } from "../schemas/midweek-participation.js";
import { makeCompositeKey } from "../../../database/util/composite-key.js";
import { persistence } from "../../../database/persistence.js";
import { getQueryClient, getSupabase } from "../../../database/context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "midweek_participation",
  queryKey: ["midweek_participation"],
  queryClient,
  schema: midweekParticipationSchema,
  getKey: (row) => makeCompositeKey(row.participant_id, row.participation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("midweek_participation").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("midweek_participation").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("midweek_participation")
        .update(mutation.modified)
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("midweek_participation")
        .delete()
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 3,
});

export const midweekParticipationCollection = createCollection({
  ...persistedOptions,
  schema: midweekParticipationSchema,
});
