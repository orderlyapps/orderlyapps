import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CbsConductorHeader } from "@amodeo/proclaimer/feature/midweek";
import { CbsConductorContent } from "@amodeo/proclaimer/feature/midweek";

function CbsConductorPage() {
  return (
    <IonPage>
      <IonHeader>
        <CbsConductorHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CbsConductorContent />
      </IonContent>
    </IonPage>
  );
}

export default CbsConductorPage;
