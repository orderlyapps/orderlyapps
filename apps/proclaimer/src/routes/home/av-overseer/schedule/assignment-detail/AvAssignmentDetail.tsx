import { IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { AvAssignmentDetailContent } from "@amodeo/proclaimer/feature/av";

function AvAssignmentDetailPage() {
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
      <AvAssignmentDetailContent week_id={week_id} assignment_id={assignment_id} />
    </IonPage>
  );
}

export default AvAssignmentDetailPage;
