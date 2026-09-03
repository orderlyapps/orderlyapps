import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { cobePermissionSchema } from "../schemas/cobe-permission.js";
import { getQueryClient, getSupabase } from "../../../database/context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "cobe_permission",
  queryKey: ["cobe_permission"],
  queryClient,
  schema: cobePermissionSchema,
  getKey: (row) => `${row.auth_user_id}:${row.congregation_id}`,
  queryFn: async () => {
    const { data, error } = await supabase.from("cobe_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("cobe_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("cobe_permission")
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
        .from("cobe_permission")
        .delete()
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
});

export const cobePermissionCollection = createCollection({
  ...baseOptions,
  schema: cobePermissionSchema,
});
