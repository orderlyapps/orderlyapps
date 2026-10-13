import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function CbsConductorPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader
          participation_id="cbs_conductor"
          label="CBS Conductor"
        />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent
          participation_id="cbs_conductor"
          label="CBS Conductor"
        />
      </IonContent>
    </IonPage>
  );
}

export default CbsConductorPage;
