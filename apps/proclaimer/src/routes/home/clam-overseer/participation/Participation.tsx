import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ParticipationHeader } from "@amodeo/proclaimer/feature/midweek";
import { ParticipationContent } from "@amodeo/proclaimer/feature/midweek";

function ParticipationPage() {
  return (
    <IonPage>
      <IonHeader>
        <ParticipationHeader />
      </IonHeader>
      <IonContent>
        <ParticipationContent />
      </IonContent>
    </IonPage>
  );
}

export default ParticipationPage;
