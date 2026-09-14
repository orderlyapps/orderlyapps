import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamOverseerHeader } from "@amodeo/proclaimer/feature/midweek";
import { ClamOverseerContent } from "@amodeo/proclaimer/feature/midweek";

function ClamOverseerPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamOverseerHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ClamOverseerContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamOverseerPage;
