import { useQueryClient } from "@tanstack/react-query";
import { toError } from "@amodeo/utils";
import type { CongregationRecord } from "../congregation-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getCongregationsCollection } from "../congregations-collection/get-congregations-collection.js";

export type UpdateCongregationChanges = Partial<Omit<CongregationRecord, "id">>;

export interface UseUpdateCongregationOptions {
  /** Called with a normalized `Error` when the optimistic update fails to persist. */
  onError?: (error: Error) => void;
}

export interface UseUpdateCongregationResult {
  update: (id: string, changes: UpdateCongregationChanges) => void;
  isConfigured: boolean;
}

/**
 * Returns a function that optimistically updates a congregation row in the
 * local collection and persists the change through the collection's
 * `onUpdate` handler. No-ops when Supabase is not configured. When
 * `options.onError` is provided, it is called with a normalized `Error` if
 * the persistence rejects (the optimistic update still rolls back
 * automatically via the collection's `onUpdate` throw).
 */
export function useUpdateCongregation(
  options: UseUpdateCongregationOptions = {},
): UseUpdateCongregationResult {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const congregations = supabase ? getCongregationsCollection(supabase, queryClient) : null;
  const { onError } = options;

  const update = (id: string, changes: UpdateCongregationChanges) => {
    if (!congregations) return;
    const tx = congregations.update(id, (draft) => {
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
