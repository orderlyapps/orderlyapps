import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AllPublishersContent } from "@/feature/home/components/proclaimer/features/publishers/all-publishers/all-publishers-content.tsx";

export default function AllPublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features/publishers" />
          </IonButtons>
          <IonTitle>All Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AllPublishersContent />
      </IonContent>
    </IonPage>
  );
}
