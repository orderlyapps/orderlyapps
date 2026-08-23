import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { cleanMajorSchema } from "../schemas/clean-major.js";
import { makeCompositeKey } from "../util/composite-key.js";
import { persistence } from "../persistence.js";
import { getQueryClient, getSupabase } from "../context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "clean_major",
  queryKey: ["clean_major"],
  queryClient,
  schema: cleanMajorSchema,
  getKey: (row) => makeCompositeKey(row.week_id, row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("clean_major").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("clean_major").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("clean_major")
        .update(mutation.modified)
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("clean_major")
        .delete()
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const cleanMajorCollection = createCollection({
  ...persistedOptions,
  schema: cleanMajorSchema,
});
