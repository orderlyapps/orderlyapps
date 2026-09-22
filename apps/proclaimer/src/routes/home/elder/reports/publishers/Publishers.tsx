import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { PublishersList } from "@amodeo/proclaimer/feature/reports";

function PublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/elder/reports" />
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <PublishersList base_path="/home/elder/reports/publishers" />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
