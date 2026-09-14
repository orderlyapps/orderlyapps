import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TreasuresHeader } from "@amodeo/proclaimer/feature/midweek";
import { TreasuresContent } from "@amodeo/proclaimer/feature/midweek";

function TreasuresPage() {
  return (
    <IonPage>
      <IonHeader>
        <TreasuresHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <TreasuresContent />
      </IonContent>
    </IonPage>
  );
}

export default TreasuresPage;
