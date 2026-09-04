import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { ReactivatedPublishersList } from "@amodeo/proclaimer/feature/reports";

function ReactivatedPublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Reactivated Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <ReactivatedPublishersList />
      </IonContent>
    </IonPage>
  );
}

export default ReactivatedPublishersPage;
