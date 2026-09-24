import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CoVisitInfoHeader } from "@amodeo/proclaimer/feature/secretary";
import { CoVisitInfoContent } from "@amodeo/proclaimer/feature/secretary";

function CoVisitInfoPage() {
  return (
    <IonPage>
      <IonHeader>
        <CoVisitInfoHeader />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <CoVisitInfoContent />
      </IonContent>
    </IonPage>
  );
}

export default CoVisitInfoPage;
