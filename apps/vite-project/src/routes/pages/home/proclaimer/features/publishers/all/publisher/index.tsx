import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherContent } from "@/feature/home/components/proclaimer/features/publishers/all-publishers/publisher/publisher-content.tsx";

export default function PublisherDetailsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features/publishers/all" />
          </IonButtons>
          <IonTitle>Publisher</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PublisherContent />
      </IonContent>
    </IonPage>
  );
}
