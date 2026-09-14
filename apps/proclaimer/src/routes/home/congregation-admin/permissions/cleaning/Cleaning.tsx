import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CleaningHeader } from "@amodeo/proclaimer/feature/permission";
import { CleaningContent } from "@amodeo/proclaimer/feature/permission";

function CleaningPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <CleaningHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <CleaningContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default CleaningPage;
