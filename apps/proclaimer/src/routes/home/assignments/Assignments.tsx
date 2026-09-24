import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AssignmentsHeader } from "@amodeo/proclaimer/feature/assignments";
import { AssignmentsContent } from "@amodeo/proclaimer/feature/assignments";

function AssignmentsPage() {
  return (
    <IonPage>
      <IonHeader>
        <AssignmentsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AssignmentsContent />
      </IonContent>
    </IonPage>
  );
}

export default AssignmentsPage;
