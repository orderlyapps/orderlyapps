import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function ParticipationPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationHeader />
      </IonHeader>
      <IonContent>
        <MidweekMeetingParticipationContent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipationPage;
