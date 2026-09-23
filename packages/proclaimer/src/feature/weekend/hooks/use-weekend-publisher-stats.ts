import { useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "../collections/weekend-assignment.ts";
import type { WeekendAssignment } from "../schemas/weekend-assignment.ts";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { computeWeekendStats } from "../utils/compute-weekend-stats.ts";
import type { WeekendPublisherStats } from "../utils/types.ts";

export type { WeekendPublisherStats };

export function useWeekendPublisherStats(
  stat_assignment_ids: string[],
  current_week_id: string,
): Map<string, WeekendPublisherStats> {
  const congregation_id = getStoredCongregation()?.id;
  const { data: allAssignments } = useLiveQuery((q) => q.from({ wa: weekendAssignmentCollection }));

  const filtered = ((allAssignments as WeekendAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  return computeWeekendStats(filtered, stat_assignment_ids, current_week_id);
}
