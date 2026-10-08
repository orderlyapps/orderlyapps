import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AvPdfExportModal, AudioVideoHeader } from "@amodeo/proclaimer/feature/av";

function AudioVideoPage() {
  return (
    <IonPage>
      <IonHeader>
        <AudioVideoHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AvPdfExportModal />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
