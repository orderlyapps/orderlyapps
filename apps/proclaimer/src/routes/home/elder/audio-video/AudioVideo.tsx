import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AvPdfExportButton, AudioVideoHeader } from "@amodeo/proclaimer/feature/av";

function AudioVideoPage() {
  return (
    <IonPage>
      <IonHeader>
        <AudioVideoHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AvPdfExportButton />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
