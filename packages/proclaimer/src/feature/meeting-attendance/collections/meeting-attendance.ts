import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { meetingAttendanceSchema } from "../schemas/meeting-attendance.js";
import { makeCompositeKey } from "../../../database/util/composite-key.js";
import { persistence } from "../../../database/supabase/persistence.js";
import { getQueryClient, getSupabase } from "../../../database/supabase/context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "meeting_attendance",
  queryKey: ["meeting_attendance"],
  queryClient,
  schema: meetingAttendanceSchema,
  getKey: (row) => makeCompositeKey(row.week_id, row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("meeting_attendance").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("meeting_attendance").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("meeting_attendance")
        .update(mutation.modified)
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("meeting_attendance")
        .delete()
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const meetingAttendanceCollection = createCollection({
  ...persistedOptions,
  schema: meetingAttendanceSchema,
});
