import { IonPage, IonHeader, IonContent } from "@ionic/react";
import {
  MidweekMeetingPdfHeader,
  MidweekMeetingPdfContent,
} from "@amodeo/proclaimer/feature/midweek-meeting";

function MidweekMeetingPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingPdfHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <MidweekMeetingPdfContent />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingPage;
