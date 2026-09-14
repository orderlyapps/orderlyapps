import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { AssignmentDetailHeader } from "@amodeo/proclaimer/feature/midweek";
import { AssignmentDetailContent } from "@amodeo/proclaimer/feature/midweek";

function AssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <AssignmentDetailHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/clam-overseer/schedule/${week_id}`}
        />
      </IonHeader>
      <AssignmentDetailContent week_id={week_id} assignment_id={assignment_id}>
        {({ info, selector }) => (
          <>
            <IonHeader>{info}</IonHeader>
            <IonContent className="content-wide remove-top-padding remove-bottom-padding">
              {selector}
            </IonContent>
          </>
        )}
      </AssignmentDetailContent>
    </IonPage>
  );
}

export default AssignmentDetailPage;
