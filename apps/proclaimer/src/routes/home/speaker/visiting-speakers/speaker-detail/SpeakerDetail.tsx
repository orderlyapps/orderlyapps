import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import {
  VisitingSpeakerDetailHeader,
  VisitingSpeakerDetailContent,
} from "@amodeo/proclaimer/feature/speaker";

function VisitingSpeakerDetailPage() {
  const { speaker_id } = useParams<{ speaker_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <VisitingSpeakerDetailHeader speaker_id={speaker_id} />
      </IonHeader>
      <IonContent className="ion-padding">
        <VisitingSpeakerDetailContent speaker_id={speaker_id} />
      </IonContent>
    </IonPage>
  );
}

export default VisitingSpeakerDetailPage;
