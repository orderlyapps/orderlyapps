import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { DownloadReportFormButton, ReportsContent } from "@amodeo/proclaimer/feature/reports";

function ReportsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Reports</IonTitle>
          <IonButtons slot="end">
            <DownloadReportFormButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ReportsContent />
      </IonContent>
    </IonPage>
  );
}

export default ReportsPage;
