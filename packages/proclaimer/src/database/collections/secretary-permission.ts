import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { getQueryClient, getSupabase } from "../context.js";

import { secretaryPermissionSchema } from "../schemas/secretary-permission.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "secretary_permission",
  queryKey: ["secretary_permission"],
  queryClient,
  schema: secretaryPermissionSchema,
  getKey: (row) => `${row.auth_user_id}:${row.congregation_id}`,
  queryFn: async () => {
    const { data, error } = await supabase.from("secretary_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("secretary_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("secretary_permission")
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
        .from("secretary_permission")
        .delete()
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
});

export const secretaryPermissionCollection = createCollection({
  ...baseOptions,
  schema: secretaryPermissionSchema,
});
