import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { DeleteTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/delete/DeleteTextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { AvAssignment, AvAssignmentID } from "../../../../schemas/av-assignment.ts";
import type { MidweekMeetingAssignment } from "../../../../../midweek-meeting/schemas/midweek-meeting-assignment.ts";
import type { WeekendAssignment } from "@amodeo/proclaimer/feature/weekend";
import type { SpeakerAssignment } from "@amodeo/proclaimer/feature/speaker";
import { useAvParticipantPublishers } from "../../../../hooks/use-av-participant-publishers.ts";
import {
  avParticipationTypeLabels,
  type AvParticipationType,
} from "../../../../utils/av-participation-type-labels.ts";
import { AvAssignmentHistory } from "../av-assignment-history/AvAssignmentHistory.tsx";

interface AvConfirmModalProps {
  is_open: boolean;
  publisher: Publisher | undefined;
  week_id: string;
  assignment_id: AvAssignmentID;
  participation_type: AvParticipationType;
  all_assignments: AvAssignment[];
  midweek_assignments: MidweekMeetingAssignment[];
  weekend_assignments: WeekendAssignment[];
  speaker_assignments: SpeakerAssignment[];
  on_dismiss: () => void;
  on_confirm: () => void;
}

export function AvConfirmModal({
  is_open,
  publisher,
  week_id,
  assignment_id,
  participation_type,
  all_assignments,
  midweek_assignments,
  weekend_assignments,
  speaker_assignments,
  on_dismiss,
  on_confirm,
}: AvConfirmModalProps) {
  const { participantPublishers, removeParticipant } =
    useAvParticipantPublishers(participation_type);

  const is_participant =
    !!publisher?.id && participantPublishers.some((p) => p.participant_id === publisher.id);

  function handleConfirm() {
    on_confirm();
    on_dismiss();
  }

  function handleRemove() {
    if (!publisher?.id) return;
    removeParticipant(publisher.id);
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {publisher ? `${publisher.first_name} ${publisher.last_name}` : "Confirm Assignment"}
          </IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {publisher?.id && (
          <AvAssignmentHistory
            publisher_id={publisher.id}
            week_id={week_id}
            assignment_id={assignment_id}
            all_assignments={all_assignments}
            midweek_assignments={midweek_assignments}
            weekend_assignments={weekend_assignments}
            speaker_assignments={speaker_assignments}
          />
        )}
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleConfirm}>
            Assign to Schedule
          </IonButton>
          <Space />
          {is_participant && (
            <DeleteTextButton
              label={`Remove ${avParticipationTypeLabels[participation_type]} Participation`}
              fill="clear"
              alert_header="Remove Participation"
              alert_message={`Remove ${publisher?.first_name} ${publisher?.last_name} as a ${avParticipationTypeLabels[participation_type]} participant?`}
              confirm_text="Remove"
              on_click={handleRemove}
            />
          )}
        </div>
      </IonContent>
    </ResponsiveModal>
  );
}
