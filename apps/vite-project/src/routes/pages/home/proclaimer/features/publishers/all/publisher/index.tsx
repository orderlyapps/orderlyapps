import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherDetails } from "@amodeo/proclaimer";
import { useParams } from "react-router-dom";

export default function PublisherDetailsPage() {
  const { id } = useParams<{ id: string }>();

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
        <PublisherDetails id={id} publisherRoutePrefix="/home/proclaimer/features/publishers/all" />
      </IonContent>
    </IonPage>
  );
}
