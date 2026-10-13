import { midweekMeetingAssignmentCollection } from "../../../../collections/midweek-meeting-assignment.ts";
import type { MidweekMeetingAssignment } from "../../../../schemas/midweek-meeting-assignment.ts";
import { makeCompositeKey } from "@amodeo/proclaimer/database/util/composite-key";

interface UseAssistantHandlersProps {
  congregation_id: string | undefined;
  assistantId: string | undefined;
  week_id: string;
  assistantAssignment: MidweekMeetingAssignment | undefined;
}

export function useAssistantHandlers({
  congregation_id,
  assistantId,
  week_id,
  assistantAssignment,
}: UseAssistantHandlersProps) {
  const handleDeleteAssistant = () => {
    if (!congregation_id || !assistantId || !assistantAssignment) return;
    const key = makeCompositeKey(assistantId, congregation_id, week_id);
    midweekMeetingAssignmentCollection.delete(key);
  };

  const handleSelectAssistant = (publisher_id: string) => {
    if (!congregation_id || !assistantId) return;
    if (assistantAssignment) {
      const key = makeCompositeKey(assistantId, congregation_id, week_id);
      midweekMeetingAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      midweekMeetingAssignmentCollection.insert({
        assignment_id: assistantId as MidweekMeetingAssignment["assignment_id"],
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return { handleDeleteAssistant, handleSelectAssistant };
}
