import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { BibleReadingHeader } from "@amodeo/proclaimer/feature/midweek";
import { BibleReadingContent } from "@amodeo/proclaimer/feature/midweek";

function BibleReadingPage() {
  return (
    <IonPage>
      <IonHeader>
        <BibleReadingHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <BibleReadingContent />
      </IonContent>
    </IonPage>
  );
}

export default BibleReadingPage;
