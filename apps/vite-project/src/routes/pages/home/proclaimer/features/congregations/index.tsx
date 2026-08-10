import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CongregationsContent } from "@/feature/home/components/proclaimer/features/congregations/congregations-content.tsx";

export default function CongregationsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features" />
          </IonButtons>
          <IonTitle>Congregations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CongregationsContent />
      </IonContent>
    </IonPage>
  );
}
