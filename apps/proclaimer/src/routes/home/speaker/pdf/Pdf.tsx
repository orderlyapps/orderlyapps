import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PdfHeader, PdfContent } from "@amodeo/proclaimer/feature/speaker";

function SpeakerPdfPage() {
  return (
    <IonPage>
      <IonHeader>
        <PdfHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <PdfContent />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerPdfPage;
