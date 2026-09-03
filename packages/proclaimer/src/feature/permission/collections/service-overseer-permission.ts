import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { serviceOverseerPermissionSchema } from "../schemas/service-overseer-permission.js";
import { getQueryClient, getSupabase } from "../../../database/context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "service_overseer_permission",
  queryKey: ["service_overseer_permission"],
  queryClient,
  schema: serviceOverseerPermissionSchema,
  getKey: (row) => `${row.auth_user_id}:${row.congregation_id}`,
  queryFn: async () => {
    const { data, error } = await supabase.from("service_overseer_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("service_overseer_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const [auth_user_id, congregation_id] = (mutation.key as string).split(":");
      const { error } = await supabase
        .from("service_overseer_permission")
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
        .from("service_overseer_permission")
        .delete()
        .eq("auth_user_id", auth_user_id)
        .eq("congregation_id", congregation_id);
      if (error) throw error;
    }
  },
});

export const serviceOverseerPermissionCollection = createCollection({
  ...baseOptions,
  schema: serviceOverseerPermissionSchema,
});
