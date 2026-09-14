import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CounselorHeader } from "@amodeo/proclaimer/feature/midweek";
import { CounselorContent } from "@amodeo/proclaimer/feature/midweek";

function CounselorPage() {
  return (
    <IonPage>
      <IonHeader>
        <CounselorHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CounselorContent />
      </IonContent>
    </IonPage>
  );
}

export default CounselorPage;
