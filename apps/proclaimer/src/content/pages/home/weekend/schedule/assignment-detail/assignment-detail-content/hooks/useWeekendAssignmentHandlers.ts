import { weekendAssignmentCollection } from "@amodeo/proclaimer/database/collections/weekend-assignment";
import type { WeekendAssignment } from "@amodeo/proclaimer/database/schemas/weekend-assignment";
import type { WeekendAssignmentID } from "@amodeo/proclaimer/database/schemas/weekend-assignment";
import { makeCompositeKey } from "@amodeo/proclaimer/database/util/composite-key";

interface UseWeekendAssignmentHandlersProps {
  congregation_id: string | undefined;
  assignment_id: string;
  week_id: string;
  assignment: WeekendAssignment | undefined;
}

export function useWeekendAssignmentHandlers({
  congregation_id,
  assignment_id,
  week_id,
  assignment,
}: UseWeekendAssignmentHandlersProps) {
  const handleDelete = () => {
    if (!congregation_id || !assignment) return;
    const key = makeCompositeKey(assignment_id, congregation_id, week_id);
    weekendAssignmentCollection.delete(key);
  };

  const handleSelect = (publisher_id: string) => {
    if (!congregation_id) return;
    if (assignment) {
      const key = makeCompositeKey(assignment_id, congregation_id, week_id);
      weekendAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      weekendAssignmentCollection.insert({
        assignment_id: assignment_id as WeekendAssignmentID,
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return { handleDelete, handleSelect };
}
