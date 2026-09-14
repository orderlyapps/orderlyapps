import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { GemsHeader } from "@amodeo/proclaimer/feature/midweek";
import { GemsContent } from "@amodeo/proclaimer/feature/midweek";

function GemsPage() {
  return (
    <IonPage>
      <IonHeader>
        <GemsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <GemsContent />
      </IonContent>
    </IonPage>
  );
}

export default GemsPage;
