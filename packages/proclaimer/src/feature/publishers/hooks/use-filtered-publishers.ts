import { useLiveQuery, eq } from "@tanstack/react-db";
import type { Ref } from "@tanstack/react-db";
import type { PublisherRecord } from "../publisher-schema.js";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { usePublishersBase, buildPublishersResult } from "./use-publishers-base.js";

export type PublisherRef = Ref<PublisherRecord>;

type WhereExpression = ReturnType<typeof eq>;

/**
 * Subscribes to a live, filtered view of the publishers collection.
 *
 * @param where - Predicate built from TanStack DB expression helpers
 *   (e.g. `eq`, `isNull`, `not`). Called with a ref to each publisher row.
 * @param deps - Every value captured by `where` **must** be listed here so
 *   the query re-runs when filters change. Omitting a captured variable will
 *   silently produce stale results.
 */
export function useFilteredPublishers(
  where: (publisher: PublisherRef) => WhereExpression,
  deps: Array<unknown>,
): UsePublishersResult {
  const { supabase, publishers } = usePublishersBase();

  const { data, isLoading, isError } = useLiveQuery(
    (q) =>
      publishers
        ? q.from({ publisher: publishers }).where(({ publisher }) => where(publisher))
        : null,
    [publishers, ...deps],
  );

  return buildPublishersResult(supabase, publishers, data, isLoading, isError);
}
