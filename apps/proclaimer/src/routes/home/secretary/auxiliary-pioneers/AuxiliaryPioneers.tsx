import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { AuxiliaryPioneerList } from "@amodeo/proclaimer/feature/reports";

function AuxiliaryPioneersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Auxiliary Pioneers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AuxiliaryPioneerList />
      </IonContent>
    </IonPage>
  );
}

export default AuxiliaryPioneersPage;
