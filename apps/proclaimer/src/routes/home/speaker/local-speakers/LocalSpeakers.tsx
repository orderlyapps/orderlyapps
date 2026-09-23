import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LocalSpeakersContent, LocalSpeakersHeader } from "@amodeo/proclaimer/feature/speaker";

function LocalSpeakersPage() {
  return (
    <IonPage>
      <IonHeader>
        <LocalSpeakersHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <LocalSpeakersContent />
      </IonContent>
    </IonPage>
  );
}

export default LocalSpeakersPage;
