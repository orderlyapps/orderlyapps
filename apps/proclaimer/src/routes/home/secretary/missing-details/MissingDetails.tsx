import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MissingDetailsHeader } from "@amodeo/proclaimer/feature/secretary";
import { MissingDetailsContent } from "@amodeo/proclaimer/feature/secretary";

function MissingDetailsPage() {
  return (
    <IonPage>
      <IonHeader>
        <MissingDetailsHeader />
      </IonHeader>
      <IonContent>
        <MissingDetailsContent />
      </IonContent>
    </IonPage>
  );
}

export default MissingDetailsPage;
