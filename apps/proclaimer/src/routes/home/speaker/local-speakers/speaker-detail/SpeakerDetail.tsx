import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { SpeakerDetailHeader, SpeakerDetailContent } from "@amodeo/proclaimer/feature/speaker";

function LocalSpeakerDetailPage() {
  const { speaker_id } = useParams<{ speaker_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <SpeakerDetailHeader speaker_id={speaker_id} />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerDetailContent speaker_id={speaker_id} />
      </IonContent>
    </IonPage>
  );
}

export default LocalSpeakerDetailPage;
