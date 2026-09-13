import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { CleaningList } from "@amodeo/proclaimer/feature/cleaning";

function CleaningPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Cleaning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <CleaningList />
      </IonContent>
    </IonPage>
  );
}

export default CleaningPage;
