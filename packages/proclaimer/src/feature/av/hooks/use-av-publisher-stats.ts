import { useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "../collections/av-assignment.ts";
import type { AvAssignment } from "../schemas/av-assignment.ts";
import type { AvParticipationType } from "../utils/av-participation-type-labels.ts";
import { computeAvStats, type AvPublisherStats } from "../utils/compute-av-stats.ts";

export type { AvPublisherStats };

export function useAvPublisherStats(
  participation_type: AvParticipationType,
  current_week_id: string,
  congregation_id: string | undefined,
  stat_participation_types: AvParticipationType[] = [],
): Map<string, AvPublisherStats> {
  const { data: allAssignments } = useLiveQuery((q) => q.from({ aa: avAssignmentCollection }));

  const filtered = ((allAssignments as AvAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  return computeAvStats(filtered, participation_type, current_week_id, stat_participation_types);
}
