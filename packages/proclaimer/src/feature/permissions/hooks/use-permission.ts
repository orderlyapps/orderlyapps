import type { PermissionRecord, PermissionType } from "../permission-schema.js";
import { usePermissions } from "./use-permissions.js";

export interface UsePermissionResult {
  data: PermissionRecord | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isConfigured: boolean;
}

/**
 * Subscribes to a single permission row identified by its composite primary
 * key `(authUserId, congregationId)`. Without both ids nothing can match, so
 * the subscription is skipped and an idle result is returned.
 */
export function usePermission(
  type: PermissionType,
  authUserId: string | undefined,
  congregationId: string | undefined,
): UsePermissionResult {
  const result = usePermissions(type, {
    enabled: Boolean(authUserId && congregationId),
    filter: {
      and: [
        { column: "auth_user_id", op: "eq", value: authUserId ?? "" },
        { column: "congregation_id", op: "eq", value: congregationId ?? "" },
      ],
    },
  });

  return {
    data: result.data[0],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    isConfigured: result.isConfigured,
  };
}
