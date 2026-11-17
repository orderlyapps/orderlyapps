import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { ministryScheduleSchema } from "../schemas/ministry-schedule.js";
import { makeCompositeKey } from "../../../database/util/composite-key.js";
import { persistence } from "../../../database/supabase/persistence.js";
import { getQueryClient, getSupabase } from "../../../database/supabase/context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "ministry_schedule",
  queryKey: ["ministry_schedule"],
  queryClient,
  schema: ministryScheduleSchema,
  getKey: (row) => makeCompositeKey(row.id, row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("ministry_schedule").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("ministry_schedule").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("ministry_schedule")
        .update(mutation.modified)
        .match({ id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("ministry_schedule")
        .delete()
        .match({ id, congregation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const ministryScheduleCollection = createCollection({
  ...persistedOptions,
  schema: ministryScheduleSchema,
});
