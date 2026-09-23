import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SuperAdminHeader, SuperAdminContent } from "@amodeo/proclaimer/feature/super-admin";

function SuperAdminPage() {
  return (
    <IonPage>
      <IonHeader>
        <SuperAdminHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SuperAdminContent />
      </IonContent>
    </IonPage>
  );
}

export default SuperAdminPage;
