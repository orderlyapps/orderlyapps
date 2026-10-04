import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { Publishers } from "@amodeo/proclaimer/feature/publisher";

function PublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <Publishers base_path="/home/secretary/publishers" />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
