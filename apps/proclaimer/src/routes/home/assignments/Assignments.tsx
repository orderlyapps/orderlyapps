import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { AssignmentsContent } from "@amodeo/proclaimer/feature/assignments";

function AssignmentsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Assignments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AssignmentsContent />
      </IonContent>
    </IonPage>
  );
}

export default AssignmentsPage;
