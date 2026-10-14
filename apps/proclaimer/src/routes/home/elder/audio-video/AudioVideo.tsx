import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { AvPdfExportButton } from "@amodeo/proclaimer/feature/av";

function AudioVideoPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/elder" />
          </IonButtons>
          <IonTitle>Audio Video</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <AvPdfExportButton />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
