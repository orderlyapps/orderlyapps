import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { EventsHeader } from "@amodeo/proclaimer/feature/permission";
import { EventsContent } from "@amodeo/proclaimer/feature/permission";

function EventsPermissionsPage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <EventsHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <EventsContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default EventsPermissionsPage;
