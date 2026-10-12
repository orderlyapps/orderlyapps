import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

function ReportsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Reports</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavItem label="Missing Reports" to="/home/secretary/reports/missing-reports" />
          <NavItem label="Records" to="/home/secretary/reports/records" />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default ReportsPage;
