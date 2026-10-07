import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { AudioVideoContent } from "@amodeo/proclaimer/feature/av";

function AvPdfPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/av-overseer" />
          </IonButtons>
          <IonTitle>Audio & Video</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <AudioVideoContent />
      </IonContent>
    </IonPage>
  );
}

export default AvPdfPage;
