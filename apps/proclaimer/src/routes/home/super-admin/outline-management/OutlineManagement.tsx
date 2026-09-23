import { IonPage, IonHeader, IonContent } from "@ionic/react";
import {
  OutlineManagementHeader,
  OutlineManagementContent,
} from "@amodeo/proclaimer/feature/super-admin";

function OutlineManagementPage() {
  return (
    <IonPage>
      <IonHeader>
        <OutlineManagementHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <OutlineManagementContent />
      </IonContent>
    </IonPage>
  );
}

export default OutlineManagementPage;
