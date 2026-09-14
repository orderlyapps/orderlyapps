import type { MidweekAssignmentId } from "../../../../../../schemas/midweek-assignment.ts";
import type { ParticipationType } from "../../utils/participation-type-map.ts";
import { participationTypeMap } from "../../utils/participation-type-map.ts";

export const participationAssignmentIds: Record<ParticipationType, MidweekAssignmentId[]> = (() => {
  const result: Partial<Record<ParticipationType, MidweekAssignmentId[]>> = {};
  for (const [assignment_id, type] of Object.entries(participationTypeMap) as [
    MidweekAssignmentId,
    ParticipationType,
  ][]) {
    if (!result[type]) result[type] = [];
    result[type]!.push(assignment_id);
  }
  return result as Record<ParticipationType, MidweekAssignmentId[]>;
})();
