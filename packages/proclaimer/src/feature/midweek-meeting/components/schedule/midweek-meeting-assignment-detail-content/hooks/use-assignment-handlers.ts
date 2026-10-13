import { midweekMeetingAssignmentCollection } from "../../../../collections/midweek-meeting-assignment.ts";
import type { MidweekMeetingAssignment } from "../../../../schemas/midweek-meeting-assignment.ts";
import { makeCompositeKey } from "@amodeo/proclaimer/database/util/composite-key";

interface UseAssignmentHandlersProps {
  congregation_id: string | undefined;
  assignment_id: string;
  week_id: string;
  assignment: MidweekMeetingAssignment | undefined;
}

export function useAssignmentHandlers({
  congregation_id,
  assignment_id,
  week_id,
  assignment,
}: UseAssignmentHandlersProps) {
  const handleDelete = () => {
    if (!congregation_id || !assignment) return;
    const key = makeCompositeKey(assignment_id, congregation_id, week_id);
    midweekMeetingAssignmentCollection.delete(key);
  };

  const handleSelect = (publisher_id: string) => {
    if (!congregation_id) return;
    if (assignment) {
      const key = makeCompositeKey(assignment_id, congregation_id, week_id);
      midweekMeetingAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      midweekMeetingAssignmentCollection.insert({
        assignment_id: assignment_id as MidweekMeetingAssignment["assignment_id"],
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return { handleDelete, handleSelect };
}
