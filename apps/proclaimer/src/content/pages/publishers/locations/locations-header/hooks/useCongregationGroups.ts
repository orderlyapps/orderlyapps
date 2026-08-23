import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@amodeo/proclaimer/database/collections/group";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Group } from "@amodeo/proclaimer/database/schemas/group";

export function useCongregationGroups(): { groups: Group[]; isLoading: boolean } {
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const groups = (data ?? []).filter((g) => g.congregation_id === congregation_id);

  return { groups, isLoading };
}
