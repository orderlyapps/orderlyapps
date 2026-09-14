import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerHeader } from "@amodeo/proclaimer/feature/permission";
import { ServiceOverseerContent } from "@amodeo/proclaimer/feature/permission";

function ServiceOverseerPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <ServiceOverseerHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <ServiceOverseerContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default ServiceOverseerPage;
