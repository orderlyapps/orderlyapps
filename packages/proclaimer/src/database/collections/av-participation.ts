import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { getQueryClient, getSupabase } from "../context.js";

import { avParticipationSchema } from "../schemas/av-participation.js";
import { makeCompositeKey } from "../util/composite-key.js";
import { persistence } from "../persistence.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "av_participation",
  queryKey: ["av_participation"],
  queryClient,
  schema: avParticipationSchema,
  getKey: (row) => makeCompositeKey(row.participant_id, row.participation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("av_participation").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("av_participation").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("av_participation")
        .update(mutation.modified)
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("av_participation")
        .delete()
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const avParticipationCollection = createCollection({
  ...persistedOptions,
  schema: avParticipationSchema,
});
