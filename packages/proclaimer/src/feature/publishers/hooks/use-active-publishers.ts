import { isNull } from "@tanstack/react-db";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export function useActivePublishers(): UsePublishersResult {
  return useFilteredPublishers((publisher) => isNull(publisher.archived_at), []);
}
