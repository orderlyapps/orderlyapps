import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WatchtowerHeader } from "@amodeo/proclaimer/feature/permission";
import { WatchtowerContent } from "@amodeo/proclaimer/feature/permission";

function WatchtowerPermissionsPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <WatchtowerHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <WatchtowerContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default WatchtowerPermissionsPage;
