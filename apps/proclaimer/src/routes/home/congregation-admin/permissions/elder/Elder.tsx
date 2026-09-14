import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ElderHeader } from "@amodeo/proclaimer/feature/permission";
import { ElderContent } from "@amodeo/proclaimer/feature/permission";

function ElderPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <ElderHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <ElderContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default ElderPage;
