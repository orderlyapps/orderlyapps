import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingParticipationTypeHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingParticipationTypeContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function TreasuresPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingParticipationTypeHeader participation_id="treasures" label="Treasures" />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingParticipationTypeContent participation_id="treasures" label="Treasures" />
      </IonContent>
    </IonPage>
  );
}

export default TreasuresPage;
