import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { MidweekAssignmentDetailHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekAssignmentDetailContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function AssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <MidweekAssignmentDetailHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/midweek-meeting-overseer/schedule/${week_id}`}
        />
      </IonHeader>
      <MidweekAssignmentDetailContent week_id={week_id} assignment_id={assignment_id}>
        {({ info, selector }) => (
          <>
            <IonHeader>{info}</IonHeader>
            <IonContent className="content-wide remove-top-padding remove-bottom-padding">
              {selector}
            </IonContent>
          </>
        )}
      </MidweekAssignmentDetailContent>
    </IonPage>
  );
}

export default AssignmentDetailPage;
