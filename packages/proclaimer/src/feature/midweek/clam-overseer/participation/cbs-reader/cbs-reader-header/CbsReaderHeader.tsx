import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { AddParticipantModal } from "../../shared/components/add-participant-modal/AddParticipantModal.tsx";

export function CbsReaderHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/clam-overseer/participation" />
        </IonButtons>
        <IonTitle>CBS Reader</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddParticipantModal
        participation_id="cbs_reader"
        modal_title="CBS Reader"
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
