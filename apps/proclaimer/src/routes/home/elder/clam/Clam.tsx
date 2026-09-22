import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamHeader, ClamContent } from "@amodeo/proclaimer/feature/midweek";

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
