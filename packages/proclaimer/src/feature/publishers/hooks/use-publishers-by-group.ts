import { eq, isNull } from "@tanstack/react-db";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export function usePublishersByGroup(groupId: string | null): UsePublishersResult {
  return useFilteredPublishers(
    (publisher) =>
      groupId === null ? isNull(publisher.group_id) : eq(publisher.group_id, groupId),
    [groupId],
  );
}
