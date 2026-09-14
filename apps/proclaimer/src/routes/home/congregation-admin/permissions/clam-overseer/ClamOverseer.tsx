import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ClamOverseerHeader } from "@amodeo/proclaimer/feature/permission";
import { ClamOverseerContent } from "@amodeo/proclaimer/feature/permission";

function ClamOverseerPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <ClamOverseerHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <ClamOverseerContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default ClamOverseerPage;
