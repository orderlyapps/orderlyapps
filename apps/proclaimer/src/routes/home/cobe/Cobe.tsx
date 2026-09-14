import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";

function CobePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>COBE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Heading size="lg" bold>
          COBE
        </Heading>
      </IonContent>
    </IonPage>
  );
}

export default CobePage;
