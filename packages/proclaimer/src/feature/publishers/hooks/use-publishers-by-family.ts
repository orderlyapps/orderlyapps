import { eq, isNull } from "@tanstack/react-db";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export function usePublishersByFamily(familyId: string | null): UsePublishersResult {
  return useFilteredPublishers(
    (publisher) =>
      familyId === null ? isNull(publisher.family_id) : eq(publisher.family_id, familyId),
    [familyId],
  );
}
