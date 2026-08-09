import { useQueryClient } from "@tanstack/react-query";
import { useLiveQuery } from "@tanstack/react-db";
import type { PublisherRecord } from "../publisher-schema.ts";
import { useSupabase } from "../../../providers/supabase-context.ts";
import { getPublishersCollection } from "../publishers-collection.ts";

export interface UsePublishersResult {
  data: PublisherRecord[];
  isLoading: boolean;
  isError: boolean;
  isConfigured: boolean;
}

export function usePublishers(): UsePublishersResult {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const publishers = supabase ? getPublishersCollection(supabase, queryClient) : null;

  const { data, isLoading, isError } = useLiveQuery(() => publishers, [publishers]);

  // Query collections report queryFn failures via utils.isError and stay
  // "ready"; the collection status only reaches "error" if sync itself throws.
  const queryFailed = publishers?.utils.isError ?? false;

  return {
    data: data ?? [],
    isLoading: supabase ? isLoading : false,
    isError: supabase ? isError || queryFailed : false,
    isConfigured: supabase !== null,
  };
}
