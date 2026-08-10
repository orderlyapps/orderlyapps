import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AllCongregationsContent } from "@/feature/home/components/proclaimer/features/congregations/all-congregations/all-congregations-content.tsx";

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
        <AllCongregationsContent />
      </IonContent>
    </IonPage>
  );
}
