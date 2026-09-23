import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamDataHeader, ClamDataContent } from "@amodeo/proclaimer/feature/super-admin";

function ClamDataPage() {
  return (
    <IonPage>
      <IonHeader>
        <ClamDataHeader />
      </IonHeader>
      <IonContent>
        <ClamDataContent />
      </IonContent>
    </IonPage>
  );
}

export default ClamDataPage;
