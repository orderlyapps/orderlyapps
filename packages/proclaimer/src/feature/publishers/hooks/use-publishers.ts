import { useLiveQuery, eq } from "@tanstack/react-db";
import type { Ref } from "@tanstack/react-db";
import { useQueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PublisherRecord } from "../publisher-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getPublishersCollection } from "../publishers-collection/get-publishers-collection.js";
import type { PublishersCollection } from "../publishers-collection/create-publishers-collection.js";

export type PublisherRef = Ref<PublisherRecord>;

export interface UsePublishersResult {
  data: PublisherRecord[];
  isLoading: boolean;
  isError: boolean;
  isConfigured: boolean;
}

type WhereExpression = ReturnType<typeof eq>;

function usePublishersBase(): {
  supabase: SupabaseClient | null;
  publishers: PublishersCollection | null;
} {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const publishers = supabase ? getPublishersCollection(supabase, queryClient) : null;
  return { supabase, publishers };
}

function buildPublishersResult(
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

/**
 * Subscribes to a live view of the publishers collection.
 *
 * @param where - Optional predicate built from TanStack DB expression helpers
 *   (e.g. `eq`, `isNull`, `not`). Called with a ref to each publisher row.
 *   When omitted, all publishers are returned.
 * @param deps - Every value captured by `where` **must** be listed here so
 *   the query re-runs when filters change. Omitting a captured variable will
 *   silently produce stale results.
 */
export function usePublishers(
  where?: (publisher: PublisherRef) => WhereExpression,
  deps: Array<unknown> = [],
): UsePublishersResult {
  const { supabase, publishers } = usePublishersBase();

  const { data, isLoading, isError } = useLiveQuery(
    (q) => {
      if (!publishers) return null;
      return where
        ? q.from({ publisher: publishers }).where(({ publisher }) => where(publisher))
        : publishers;
    },
    [publishers, ...deps],
  );

  return buildPublishersResult(supabase, publishers, data, isLoading, isError);
}
