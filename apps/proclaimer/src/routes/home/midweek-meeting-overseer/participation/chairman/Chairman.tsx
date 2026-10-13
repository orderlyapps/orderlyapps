import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function ChairmanPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader participation_id="chairman" label="Chairman" />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent participation_id="chairman" label="Chairman" />
      </IonContent>
    </IonPage>
  );
}

export default ChairmanPage;
