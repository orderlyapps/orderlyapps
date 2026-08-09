import { isNull, not } from "@tanstack/react-db";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export function useArchivedPublishers(): UsePublishersResult {
  return useFilteredPublishers((publisher) => not(isNull(publisher.archived_at)), []);
}
