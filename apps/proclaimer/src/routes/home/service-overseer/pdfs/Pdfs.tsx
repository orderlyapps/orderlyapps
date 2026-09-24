import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PdfsHeader } from "@amodeo/proclaimer/feature/map";
import { PdfsContent } from "@amodeo/proclaimer/feature/map";

function PdfsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PdfsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <PdfsContent />
      </IonContent>
    </IonPage>
  );
}

export default PdfsPage;
