import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TerritoryServantHeader } from "@amodeo/proclaimer/feature/permission";
import { TerritoryServantContent } from "@amodeo/proclaimer/feature/permission";

function TerritoryServantPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <TerritoryServantHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <TerritoryServantContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default TerritoryServantPage;
