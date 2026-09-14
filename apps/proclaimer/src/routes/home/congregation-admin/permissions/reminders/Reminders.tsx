import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { RemindersHeader } from "@amodeo/proclaimer/feature/permission";
import { RemindersContent } from "@amodeo/proclaimer/feature/permission";

function RemindersPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <RemindersHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <RemindersContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default RemindersPage;
