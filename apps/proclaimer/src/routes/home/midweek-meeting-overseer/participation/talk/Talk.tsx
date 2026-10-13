import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function TalkPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader participation_id="talk" label="Talk" />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent participation_id="talk" label="Talk" />
      </IonContent>
    </IonPage>
  );
}

export default TalkPage;
