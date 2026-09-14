import { useLiveQuery } from "@tanstack/react-db";
import { midweekAssignmentCollection } from "../../../../../../../../collections/midweek-assignment.ts";
import type { MidweekAssignment } from "../../../../../../../../schemas/midweek-assignment.ts";
import type { ParticipationType } from "../../utils/participationTypeMap.ts";
import { computeStats } from "./computeStats.ts";
import type { PublisherStats } from "./computeStats.ts";

export type { PublisherStats } from "./computeStats.ts";

export function usePublisherStats(
  participation_type: ParticipationType | null,
  current_week_id: string,
  congregation_id: string | undefined,
  stat_participation_types: ParticipationType[] = [],
): Map<string, PublisherStats> {
  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));

  const filtered = ((allAssignments as MidweekAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  if (!participation_type) return new Map();
  return computeStats(filtered, participation_type, current_week_id, stat_participation_types);
}
