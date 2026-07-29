import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DetailsContent } from "@/feature/home/components/details/details-content.tsx";

export default function DetailsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DetailsContent />
      </IonContent>
    </IonPage>
  );
}
