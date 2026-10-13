import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { AddMidweekMeetingParticipantModal } from "../add-midweek-meeting-participant-modal/AddMidweekMeetingParticipantModal.tsx";
import type { MidweekMeetingParticipation } from "../../../schemas/midweek-meeting-participation.ts";

interface MidweekMeetingParticipationTypeHeaderProps {
  participation_id: MidweekMeetingParticipation["participation_id"];
  label: string;
}

export function MidweekMeetingParticipationTypeHeader({
  participation_id,
  label,
}: MidweekMeetingParticipationTypeHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/midweek-meeting-overseer/participation" />
        </IonButtons>
        <IonTitle>{label}</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddMidweekMeetingParticipantModal
        participation_id={participation_id}
        modal_title={label}
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
