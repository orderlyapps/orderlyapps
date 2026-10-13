import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingOverseerHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingOverseerContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function MidweekMeetingOverseerPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingOverseerHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <MidweekMeetingOverseerContent />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingOverseerPage;
