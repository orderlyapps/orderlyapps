import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PermissionsHeader } from "@amodeo/proclaimer/feature/permission";
import { PermissionsContent } from "@amodeo/proclaimer/feature/permission";

function PermissionsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PermissionsHeader />
      </IonHeader>
      <IonContent>
        <PermissionsContent />
      </IonContent>
    </IonPage>
  );
}

export default PermissionsPage;
