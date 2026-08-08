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

  return {
    data: data ?? [],
    isLoading: supabase ? isLoading : false,
    isError: supabase ? isError : false,
    isConfigured: supabase !== null,
  };
}
