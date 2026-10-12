import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { BranchReport } from "@amodeo/proclaimer/feature/reports";

function BranchReportPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary/reports" />
          </IonButtons>
          <IonTitle>Branch Report</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="remove-top-padding">
        <BranchReport />
      </IonContent>
    </IonPage>
  );
}

export default BranchReportPage;
