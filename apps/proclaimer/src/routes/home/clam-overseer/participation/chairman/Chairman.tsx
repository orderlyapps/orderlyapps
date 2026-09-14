import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ChairmanHeader } from "@amodeo/proclaimer/feature/midweek";
import { ChairmanContent } from "@amodeo/proclaimer/feature/midweek";

function ChairmanPage() {
  return (
    <IonPage>
      <IonHeader>
        <ChairmanHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ChairmanContent />
      </IonContent>
    </IonPage>
  );
}

export default ChairmanPage;
