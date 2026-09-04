import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { midweekMeetingDataSchema } from "../schemas/midweek-meeting-data.js";
import { persistence } from "../../../database/supabase/persistence.js";
import { getQueryClient, getSupabase } from "../../../database/supabase/context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "midweek_meeting_data",
  queryKey: ["midweek_meeting_data"],
  queryClient,
  schema: midweekMeetingDataSchema,
  getKey: (row) => row.week_id,
  queryFn: async () => {
    const { data, error } = await supabase.from("midweek_meeting_data").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("midweek_meeting_data").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("midweek_meeting_data")
        .update(mutation.modified)
        .eq("week_id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("midweek_meeting_data")
        .delete()
        .eq("week_id", mutation.key);
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const midweekMeetingDataCollection = createCollection({
  ...persistedOptions,
  schema: midweekMeetingDataSchema,
});
