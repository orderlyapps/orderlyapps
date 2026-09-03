import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@amodeo/proclaimer/feature/group";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { Group } from "@amodeo/proclaimer/feature/group";

export function useCongregationGroups(): { groups: Group[]; isLoading: boolean } {
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const groups = (data ?? []).filter((g) => g.congregation_id === congregation_id);

  return { groups, isLoading };
}
