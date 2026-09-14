import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AssistantHeader } from "@amodeo/proclaimer/feature/midweek";
import { AssistantContent } from "@amodeo/proclaimer/feature/midweek";

function AssistantPage() {
  return (
    <IonPage>
      <IonHeader>
        <AssistantHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <AssistantContent />
      </IonContent>
    </IonPage>
  );
}

export default AssistantPage;
