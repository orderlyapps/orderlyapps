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
import { useParams } from "react-router-dom";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import {
  AddAvParticipantModal,
  AvParticipantPublishersList,
  avParticipationTypeLabels,
  avParticipationTypes,
  type AvParticipationType,
} from "@amodeo/proclaimer/feature/av";

function AvParticipationTypePage() {
  const { participation_id } = useParams<{ participation_id: string }>();
  const [showModal, setShowModal] = useState(false);

  if (!avParticipationTypes.includes(participation_id as AvParticipationType)) {
    return null;
  }

  const label = avParticipationTypeLabels[participation_id as AvParticipationType];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/av-overseer/participation" />
          </IonButtons>
          <IonTitle>{label}</IonTitle>
          <IonButtons slot="end">
            <AddIconButton on_click={() => setShowModal(true)} />
          </IonButtons>
        </IonToolbar>
        <AddAvParticipantModal
          participation_id={participation_id}
          modal_title={label}
          is_open={showModal}
          on_dismiss={() => setShowModal(false)}
        />
      </IonHeader>
      <IonContent className="content-wide">
        <div className="ion-padding">
          <Heading size="lg" bold>
            {label}
          </Heading>
          <AvParticipantPublishersList participation_id={participation_id} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AvParticipationTypePage;
