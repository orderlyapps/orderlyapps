import { useLiveQuery } from "@tanstack/react-db";
import { usePublishersBase, buildPublishersResult } from "./use-publishers-base.js";
import type { UsePublishersResult } from "./use-publishers-base.js";
export type { UsePublishersResult };

export function usePublishers(): UsePublishersResult {
  const { supabase, publishers } = usePublishersBase();

  const { data, isLoading, isError } = useLiveQuery(() => publishers, [publishers]);

  return buildPublishersResult(supabase, publishers, data, isLoading, isError);
}
