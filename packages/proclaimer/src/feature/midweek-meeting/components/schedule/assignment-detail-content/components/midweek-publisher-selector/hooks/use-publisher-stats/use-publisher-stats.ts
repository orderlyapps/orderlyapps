import { useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingAssignmentCollection } from "../../../../../../../collections/midweek-meeting-assignment.ts";
import type { MidweekMeetingAssignment } from "../../../../../../../schemas/midweek-meeting-assignment.ts";
import type { ParticipationType } from "../../utils/participation-type-map.ts";
import { computeStats } from "./compute-stats.ts";
import type { PublisherStats } from "./compute-stats.ts";

export type { PublisherStats } from "./compute-stats.ts";

export function usePublisherStats(
  participation_type: ParticipationType | null,
  current_week_id: string,
  congregation_id: string | undefined,
  stat_participation_types: ParticipationType[] = [],
): Map<string, PublisherStats> {
  const { data: allAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekMeetingAssignmentCollection }),
  );

  const filtered = ((allAssignments as MidweekMeetingAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  if (!participation_type) return new Map();
  return computeStats(filtered, participation_type, current_week_id, stat_participation_types);
}
