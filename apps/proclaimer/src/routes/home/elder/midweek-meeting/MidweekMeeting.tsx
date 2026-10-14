import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { MidweekSchedulePdfDownloadButton } from "@amodeo/proclaimer/feature/midweek-meeting";

function MidweekMeetingPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/elder" />
          </IonButtons>
          <IonTitle>CLAM</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <MidweekSchedulePdfDownloadButton />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingPage;
