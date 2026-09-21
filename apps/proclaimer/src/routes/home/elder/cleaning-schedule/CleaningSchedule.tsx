import { IonPage, IonHeader, IonContent } from "@ionic/react";
import {
  CleaningScheduleHeader,
  CleaningScheduleContent,
} from "@amodeo/proclaimer/feature/cleaning";

function CleaningSchedulePage() {
  return (
    <IonPage>
      <IonHeader>
        <CleaningScheduleHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <CleaningScheduleContent />
      </IonContent>
    </IonPage>
  );
}

export default CleaningSchedulePage;
