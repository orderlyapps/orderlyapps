import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ApplyHeader } from "@amodeo/proclaimer/feature/midweek";
import { ApplyContent } from "@amodeo/proclaimer/feature/midweek";

function ApplyPage() {
  return (
    <IonPage>
      <IonHeader>
        <ApplyHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ApplyContent />
      </IonContent>
    </IonPage>
  );
}

export default ApplyPage;
