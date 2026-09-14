import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SecretaryHeader } from "@amodeo/proclaimer/feature/permission";
import { SecretaryContent } from "@amodeo/proclaimer/feature/permission";

function SecretaryPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <SecretaryHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <SecretaryContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default SecretaryPage;
