import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LivingHeader } from "@amodeo/proclaimer/feature/midweek";
import { LivingContent } from "@amodeo/proclaimer/feature/midweek";

function LivingPage() {
  return (
    <IonPage>
      <IonHeader>
        <LivingHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <LivingContent />
      </IonContent>
    </IonPage>
  );
}

export default LivingPage;
