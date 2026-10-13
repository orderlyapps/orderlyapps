import type { MidweekMeetingAssignmentId } from "../../../../../../../schemas/midweek-meeting-assignment.ts";
import type { ParticipationType } from "../../utils/participation-type-map.ts";
import { participationTypeMap } from "../../utils/participation-type-map.ts";

export const participationAssignmentIds: Record<ParticipationType, MidweekMeetingAssignmentId[]> =
  (() => {
    const result: Partial<Record<ParticipationType, MidweekMeetingAssignmentId[]>> = {};
    for (const [assignment_id, type] of Object.entries(participationTypeMap) as [
      MidweekMeetingAssignmentId,
      ParticipationType,
    ][]) {
      if (!result[type]) result[type] = [];
      result[type]!.push(assignment_id);
    }
    return result as Record<ParticipationType, MidweekMeetingAssignmentId[]>;
  })();
