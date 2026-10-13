import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function BibleReadingPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader
          participation_id="bible_reading"
          label="Bible Reading"
        />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent
          participation_id="bible_reading"
          label="Bible Reading"
        />
      </IonContent>
    </IonPage>
  );
}

export default BibleReadingPage;
