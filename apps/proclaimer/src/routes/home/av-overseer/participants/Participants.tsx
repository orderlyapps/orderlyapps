import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { AddParticipantModal, ParticipantsContent } from "@amodeo/proclaimer/feature/av";

function ParticipantsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/av-overseer" />
          </IonButtons>
          <IonTitle>Participants</IonTitle>
          <IonButtons slot="end">
            <AddIconButton on_click={() => setShowModal(true)} />
          </IonButtons>
        </IonToolbar>
        <AddParticipantModal is_open={showModal} on_dismiss={() => setShowModal(false)} />
      </IonHeader>
      <IonContent className="content-wide">
        <ParticipantsContent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipantsPage;
