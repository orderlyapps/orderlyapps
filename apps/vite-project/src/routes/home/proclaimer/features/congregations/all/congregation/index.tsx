import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CongregationDetails } from "@amodeo/proclaimer";
import { useParams } from "react-router-dom";

export default function CongregationDetailsPage() {
  const { id } = useParams<{ id: string }>();

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
        <CongregationDetails
          id={id}
          congregationRoutePrefix="/home/proclaimer/features/congregations/all"
        />
      </IonContent>
    </IonPage>
  );
}
