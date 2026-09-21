import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SpeakerScheduleHeader, SpeakerScheduleContent } from "@amodeo/proclaimer/feature/speaker";

function SpeakerSchedulePage() {
  return (
    <IonPage>
      <IonHeader>
        <SpeakerScheduleHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <SpeakerScheduleContent />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerSchedulePage;
