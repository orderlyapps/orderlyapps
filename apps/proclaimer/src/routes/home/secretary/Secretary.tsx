import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SecretaryHeader } from "@amodeo/proclaimer/feature/secretary";
import { SecretaryContent } from "@amodeo/proclaimer/feature/secretary";

function SecretaryPage() {
  return (
    <IonPage>
      <IonHeader>
        <SecretaryHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SecretaryContent />
      </IonContent>
    </IonPage>
  );
}

export default SecretaryPage;
