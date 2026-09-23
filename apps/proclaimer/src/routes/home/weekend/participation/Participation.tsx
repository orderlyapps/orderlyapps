import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ParticipationHeader, ParticipationContent } from "@amodeo/proclaimer/feature/weekend";

function WeekendParticipationPage() {
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

export default WeekendParticipationPage;
