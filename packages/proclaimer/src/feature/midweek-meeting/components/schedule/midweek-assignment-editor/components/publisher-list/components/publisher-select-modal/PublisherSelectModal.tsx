import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { DeleteTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/delete/DeleteTextButton";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { MidweekMeetingAssignment } from "../../../../../../../schemas/midweek-meeting-assignment.ts";
import { useMidweekMeetingParticipantPublishers } from "../../../../../../../hooks/use-midweek-meeting-participant-publishers.ts";
import { midweekMeetingParticipationTypeLabels } from "../../../../../../../utils/midweek-meeting-participation-type-labels.ts";
import type { ParticipationType } from "../../../midweek-publisher-selector/utils/participation-type-map.ts";
import { AssignmentHistory } from "./components/assignment-history/AssignmentHistory.tsx";
import { Space } from "../../../../../../../../../ui/components/layout/space/Space.tsx";

interface PublisherSelectModalProps {
  is_open: boolean;
  publisher: Publisher | undefined;
  on_dismiss: () => void;
  on_confirm: () => void;
  week_id: string;
  all_assignments: MidweekMeetingAssignment[];
  publishers: Publisher[];
  participation_type: ParticipationType;
}

export function PublisherSelectModal({
  is_open,
  publisher,
  on_dismiss,
  on_confirm,
  week_id,
  all_assignments,
  publishers,
  participation_type,
}: PublisherSelectModalProps) {
  const { participantPublishers, removeParticipant } =
    useMidweekMeetingParticipantPublishers(participation_type);

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
          <AssignmentHistory
            publisher_id={publisher.id}
            week_id={week_id}
            all_assignments={all_assignments}
            publishers={publishers}
          />
        )}
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleConfirm}>
            Assign to Schedule
          </IonButton>
          <Space />
          {is_participant && (
            <DeleteTextButton
              label={`Remove ${midweekMeetingParticipationTypeLabels[participation_type]} Participation`}
              fill="clear"
              alert_header="Remove Participation"
              alert_message={`Remove ${publisher?.first_name} ${publisher?.last_name} as a ${midweekMeetingParticipationTypeLabels[participation_type]} participant?`}
              confirm_text="Remove"
              on_click={handleRemove}
            />
          )}
        </div>
      </IonContent>
    </ResponsiveModal>
  );
}
