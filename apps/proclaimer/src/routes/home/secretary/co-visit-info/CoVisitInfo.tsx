import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CoVisitInfoHeader } from "@proclaimer-content/pages/home/secretary/co-visit-info/co-visit-info-header/CoVisitInfoHeader";
import { CoVisitInfoContent } from "@proclaimer-content/pages/home/secretary/co-visit-info/co-visit-info-content/CoVisitInfoContent";

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
