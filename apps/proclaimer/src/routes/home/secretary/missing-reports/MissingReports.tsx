import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { MissingReportsList } from "@amodeo/proclaimer/feature/reports";

function MissingReportsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Missing Reports</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MissingReportsList />
      </IonContent>
    </IonPage>
  );
}

export default MissingReportsPage;
