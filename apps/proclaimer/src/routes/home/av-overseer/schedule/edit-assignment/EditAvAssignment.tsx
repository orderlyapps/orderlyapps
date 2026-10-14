import { IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { AvAssignmentEditor } from "@amodeo/proclaimer/feature/av";

function EditAvAssignmentPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/home/av-overseer/schedule/${week_id}`} />
          </IonButtons>
          <IonTitle>{getTheocraticWeekLabel(week_id)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <AvAssignmentEditor week_id={week_id} assignment_id={assignment_id} />
    </IonPage>
  );
}

export default EditAvAssignmentPage;
