import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CongregationList } from "@amodeo/proclaimer";

export default function AllCongregationsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features/congregations" />
          </IonButtons>
          <IonTitle>All Congregations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CongregationList congregationRoutePrefix="/home/proclaimer/features/congregations/all" />
      </IonContent>
    </IonPage>
  );
}
