import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { AddWeekendParticipantModal } from "../add-weekend-participant-modal/AddWeekendParticipantModal.tsx";

interface ParticipationTypeHeaderProps {
  participation_id: string;
  label: string;
}

export function ParticipationTypeHeader({ participation_id, label }: ParticipationTypeHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/weekend/participation" />
        </IonButtons>
        <IonTitle>{label}</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddWeekendParticipantModal
        participation_id={participation_id}
        modal_title={label}
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
