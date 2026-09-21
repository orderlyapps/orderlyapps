import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WatchtowerHeader, WatchtowerContent } from "@amodeo/proclaimer/feature/timers";

function WatchtowerToolPage() {
  const [show_settings, setShowSettings] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <WatchtowerHeader on_settings={() => setShowSettings(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <WatchtowerContent
          show_settings={show_settings}
          on_dismiss_settings={() => setShowSettings(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default WatchtowerToolPage;
