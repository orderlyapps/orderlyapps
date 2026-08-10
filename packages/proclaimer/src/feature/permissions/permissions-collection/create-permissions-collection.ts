import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import type { QueryClient } from "@tanstack/react-query";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getClientId } from "../../../supabase/get-client-id.js";
import {
  permissionKey,
  permissionRecordSchema,
  permissionTableName,
  type PermissionType,
} from "../permission-schema.js";

export function createPermissionsCollection(
  supabase: SupabaseClient,
  queryClient: QueryClient,
  type: PermissionType,
) {
  const table = permissionTableName(type);
  return createCollection(
    queryCollectionOptions({
      queryKey: ["permissions", type, getClientId(supabase)],
      queryFn: async () => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) throw error;
        return z.array(permissionRecordSchema).parse(data ?? []);
      },
      queryClient,
      schema: permissionRecordSchema,
      getKey: (permission) => permissionKey(permission),
      onUpdate: async ({ transaction }) => {
        const partialSchema = permissionRecordSchema.partial();
        for (const mutation of transaction.mutations) {
          const parsed = partialSchema.safeParse(mutation.changes);
          if (!parsed.success) throw parsed.error;
          const payload: Record<string, unknown> = { ...parsed.data };
          // The composite primary key identifies the row; never write it back
          delete payload.auth_user_id;
          delete payload.congregation_id;
          if (Object.keys(payload).length === 0) continue;
          const [authUserId, congregationId] = String(mutation.key).split(":");
          const { error } = await supabase
            .from(table)
            .update(payload)
            .eq("auth_user_id", authUserId)
            .eq("congregation_id", congregationId);
          if (error) throw error;
        }
      },
    }),
  );
}

export type PermissionsCollection = ReturnType<typeof createPermissionsCollection>;
