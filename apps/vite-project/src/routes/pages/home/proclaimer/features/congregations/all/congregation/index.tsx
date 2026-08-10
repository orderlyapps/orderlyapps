import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CongregationContent } from "@/feature/home/components/proclaimer/features/congregations/all-congregations/congregation/congregation-content.tsx";

export default function CongregationDetailsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features/congregations/all" />
          </IonButtons>
          <IonTitle>Congregation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CongregationContent />
      </IonContent>
    </IonPage>
  );
}
