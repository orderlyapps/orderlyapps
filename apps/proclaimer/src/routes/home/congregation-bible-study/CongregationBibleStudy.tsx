import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CongregationBibleStudyHeader } from "@amodeo/proclaimer/feature/timers";
import { CongregationBibleStudyContent } from "@amodeo/proclaimer/feature/timers";

function CongregationBibleStudyPage() {
  const [show_settings, setShowSettings] = useState(false);
  const [show_studies, setShowStudies] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <CongregationBibleStudyHeader
          on_studies={() => setShowStudies(true)}
          on_settings={() => setShowSettings(true)}
        />
      </IonHeader>
      <IonContent className="ion-padding">
        <CongregationBibleStudyContent
          show_settings={show_settings}
          on_dismiss_settings={() => setShowSettings(false)}
          show_studies={show_studies}
          on_dismiss_studies={() => setShowStudies(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default CongregationBibleStudyPage;
