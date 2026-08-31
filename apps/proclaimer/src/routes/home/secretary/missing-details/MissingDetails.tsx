import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MissingDetailsHeader } from "@proclaimer-content/pages/home/secretary/missing-details/missing-details-header/MissingDetailsHeader";
import { MissingDetailsContent } from "@proclaimer-content/pages/home/secretary/missing-details/missing-details-content/MissingDetailsContent";

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
