import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RegularPioneersContent } from "@amodeo/proclaimer/feature/regular-pioneer";

function PioneersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Regular Pioneers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <RegularPioneersContent />
      </IonContent>
    </IonPage>
  );
}

export default PioneersPage;
