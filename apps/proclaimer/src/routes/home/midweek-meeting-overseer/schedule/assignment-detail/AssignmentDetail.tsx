import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { MidweekAssignmentDetailContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function AssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/home/midweek-meeting-overseer/schedule/${week_id}`} />
          </IonButtons>
          <IonTitle>{getTheocraticWeekLabel(week_id)}</IonTitle>
        </IonToolbar>
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
