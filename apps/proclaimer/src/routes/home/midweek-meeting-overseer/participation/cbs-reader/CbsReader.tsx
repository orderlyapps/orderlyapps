import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function CbsReaderPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader participation_id="cbs_reader" label="CBS Reader" />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent participation_id="cbs_reader" label="CBS Reader" />
      </IonContent>
    </IonPage>
  );
}

export default CbsReaderPage;
