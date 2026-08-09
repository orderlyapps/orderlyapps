import { useQueryClient } from "@tanstack/react-query";
import type { PublisherRecord } from "../publisher-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getPublishersCollection } from "../publishers-collection/get-publishers-collection.js";

export type UpdatePublisherChanges = Partial<Omit<PublisherRecord, "id">>;

export interface UseUpdatePublisherResult {
  update: (id: string, changes: UpdatePublisherChanges) => void;
  isConfigured: boolean;
}

/**
 * Returns a function that optimistically updates a publisher row in the local
 * collection and persists the change through the collection's `onUpdate`
 * handler. No-ops when Supabase is not configured.
 */
export function useUpdatePublisher(): UseUpdatePublisherResult {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const publishers = supabase ? getPublishersCollection(supabase, queryClient) : null;

  const update = (id: string, changes: UpdatePublisherChanges) => {
    if (!publishers) return;
    publishers.update(id, (draft) => {
      Object.assign(draft, changes);
    });
  };

  return { update, isConfigured: supabase !== null };
}
