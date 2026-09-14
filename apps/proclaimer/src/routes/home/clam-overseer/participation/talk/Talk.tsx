import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TalkHeader } from "@amodeo/proclaimer/feature/midweek";
import { TalkContent } from "@amodeo/proclaimer/feature/midweek";

function TalkPage() {
  return (
    <IonPage>
      <IonHeader>
        <TalkHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <TalkContent />
      </IonContent>
    </IonPage>
  );
}

export default TalkPage;
