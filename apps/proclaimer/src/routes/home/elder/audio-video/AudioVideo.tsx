import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AudioVideoContent, AudioVideoHeader } from "@amodeo/proclaimer/feature/av";

function AudioVideoPage() {
  return (
    <IonPage>
      <IonHeader>
        <AudioVideoHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AudioVideoContent />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
