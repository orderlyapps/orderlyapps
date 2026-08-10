import { useQueryClient } from "@tanstack/react-query";
import { toError } from "@amodeo/utils";
import type { PermissionRecord, PermissionType } from "../permission-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getPermissionsCollection } from "../permissions-collection/get-permissions-collection.js";

export type UpdatePermissionChanges = Partial<
  Omit<PermissionRecord, "auth_user_id" | "congregation_id">
>;

export interface UseUpdatePermissionOptions {
  /** Called with a normalized `Error` when the optimistic update fails to persist. */
  onError?: (error: Error) => void;
}

export interface UseUpdatePermissionResult {
  update: (authUserId: string, congregationId: string, changes: UpdatePermissionChanges) => void;
  isConfigured: boolean;
}

/**
 * Returns a function that optimistically updates a permission row in the
 * local collection and persists the change through the collection's
 * `onUpdate` handler. No-ops when Supabase is not configured. When
 * `options.onError` is provided, it is called with a normalized `Error` if
 * the persistence rejects (the optimistic update still rolls back
 * automatically via the collection's `onUpdate` throw).
 */
export function useUpdatePermission(
  type: PermissionType,
  options: UseUpdatePermissionOptions = {},
): UseUpdatePermissionResult {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const permissions = supabase ? getPermissionsCollection(supabase, queryClient, type) : null;
  const { onError } = options;

  const update = (authUserId: string, congregationId: string, changes: UpdatePermissionChanges) => {
    if (!permissions) return;
    const key = `${authUserId}:${congregationId}`;
    const tx = permissions.update(key, (draft) => {
      Object.assign(draft, changes);
    });
    if (onError) {
      void tx.isPersisted.promise.catch((reason: unknown) => {
        onError(toError(reason));
      });
    } else {
      // Suppress unhandled promise rejection when no onError callback is provided
      void tx.isPersisted.promise.catch(() => {});
    }
  };

  return { update, isConfigured: supabase !== null };
}
