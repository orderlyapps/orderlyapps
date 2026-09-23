import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SpeakerHeader, SpeakerContent } from "@amodeo/proclaimer/feature/speaker";

function SpeakerPage() {
  return (
    <IonPage>
      <IonHeader>
        <SpeakerHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerContent />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerPage;
