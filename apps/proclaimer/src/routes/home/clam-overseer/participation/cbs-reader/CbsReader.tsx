import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CbsReaderHeader } from "@amodeo/proclaimer/feature/midweek";
import { CbsReaderContent } from "@amodeo/proclaimer/feature/midweek";

function CbsReaderPage() {
  return (
    <IonPage>
      <IonHeader>
        <CbsReaderHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CbsReaderContent />
      </IonContent>
    </IonPage>
  );
}

export default CbsReaderPage;
