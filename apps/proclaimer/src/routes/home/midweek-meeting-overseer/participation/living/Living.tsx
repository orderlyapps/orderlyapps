import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function LivingPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader participation_id="living" label="Living" />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent participation_id="living" label="Living" />
      </IonContent>
    </IonPage>
  );
}

export default LivingPage;
