import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ReportsHeader } from "@amodeo/proclaimer/feature/permission";
import { ReportsContent } from "@amodeo/proclaimer/feature/permission";

function ReportsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ReportsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ReportsContent />
      </IonContent>
    </IonPage>
  );
}

export default ReportsPage;
