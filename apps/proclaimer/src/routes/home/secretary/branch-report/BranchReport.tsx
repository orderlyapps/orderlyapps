import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { BranchReportHeader } from "@amodeo/proclaimer/feature/secretary";
import { BranchReportContent } from "@amodeo/proclaimer/feature/secretary";

function BranchReportPage() {
  return (
    <IonPage>
      <IonHeader>
        <BranchReportHeader />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <BranchReportContent />
      </IonContent>
    </IonPage>
  );
}

export default BranchReportPage;
