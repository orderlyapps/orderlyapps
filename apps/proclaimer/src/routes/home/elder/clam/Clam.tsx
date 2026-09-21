import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamHeader } from "@amodeo/proclaimer/feature/midweek";
import { ClamContent } from "@proclaimer-content/pages/home/elder/clam/clam-content/ClamContent";

function ClamPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ClamContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamPage;
