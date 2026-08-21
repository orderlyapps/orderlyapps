import { useQueryClient } from "@tanstack/react-query";
import { toError } from "@amodeo/utils";
import type { PublisherRecord } from "../publisher-schema.js";
import { useSupabaseOrNull } from "../../../supabase/supabase-context.js";
import { getPublishersCollection } from "../publishers-collection/get-publishers-collection.js";

export type UpdatePublisherChanges = Partial<Omit<PublisherRecord, "id">>;

export interface UseUpdatePublisherOptions {
  /** Called with a normalized `Error` when the optimistic update fails to persist. */
  onError?: (error: Error) => void;
}

export interface UseUpdatePublisherResult {
  update: (id: string, changes: UpdatePublisherChanges) => void;
  isConfigured: boolean;
}

/**
 * Returns a function that optimistically updates a publisher row in the local
 * collection and persists the change through the collection's `onUpdate`
 * handler. No-ops when Supabase is not configured. When `options.onError` is
 * provided, it is called with a normalized `Error` if the persistence rejects
 * (the optimistic update still rolls back automatically via the collection's
 * `onUpdate` throw).
 */
export function useUpdatePublisher(
  options: UseUpdatePublisherOptions = {},
): UseUpdatePublisherResult {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const publishers = supabase ? getPublishersCollection(supabase, queryClient) : null;
  const { onError } = options;

  const update = (id: string, changes: UpdatePublisherChanges) => {
    if (!publishers) return;
    const tx = publishers.update(id, (draft) => {
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
