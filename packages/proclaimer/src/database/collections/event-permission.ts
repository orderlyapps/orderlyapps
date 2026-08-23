import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { eventPermissionSchema } from "../schemas/event-permission.js";
import { getQueryClient, getSupabase } from "../context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "event_permission",
  queryKey: ["event_permission"],
  queryClient,
  schema: eventPermissionSchema,
  getKey: (row) => `${row.auth_user_id}:${row.congregation_id}`,
  queryFn: async () => {
    const { data, error } = await supabase.from("event_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("event_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("event_permission")
        .update(mutation.modified)
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("event_permission")
        .delete()
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
});

export const eventPermissionCollection = createCollection({
  ...baseOptions,
  schema: eventPermissionSchema,
});
