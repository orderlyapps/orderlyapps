import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CongregationAdminHeader } from "@amodeo/proclaimer/feature/permission";
import { CongregationAdminContent } from "@amodeo/proclaimer/feature/permission";

function CongregationAdminPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationAdminHeader />
      </IonHeader>
      <IonContent>
        <CongregationAdminContent />
      </IonContent>
    </IonPage>
  );
}

export default CongregationAdminPage;
