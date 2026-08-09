import { useQueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PublisherRecord } from "../publisher-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getPublishersCollection } from "../publishers-collection/get-publishers-collection.js";
import type { PublishersCollection } from "../publishers-collection/create-publishers-collection.js";

export interface UsePublishersResult {
  data: PublisherRecord[];
  isLoading: boolean;
  isError: boolean;
  isConfigured: boolean;
}

export function usePublishersBase(): {
  supabase: SupabaseClient | null;
  publishers: PublishersCollection | null;
} {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const publishers = supabase ? getPublishersCollection(supabase, queryClient) : null;
  return { supabase, publishers };
}

export function buildPublishersResult(
  supabase: SupabaseClient | null,
  publishers: PublishersCollection | null,
  data: PublisherRecord[] | undefined,
  isLoading: boolean,
  isError: boolean,
): UsePublishersResult {
  const queryFailed = publishers?.utils.isError ?? false;
  return {
    data: data ?? [],
    isLoading: supabase ? isLoading : false,
    isError: supabase ? isError || queryFailed : false,
    isConfigured: supabase !== null,
  };
}
