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
import { MidweekAssignmentEditor } from "@amodeo/proclaimer/feature/midweek-meeting";

function EditMidweekAssignmentPage() {
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
      <MidweekAssignmentEditor week_id={week_id} assignment_id={assignment_id}>
        {({ info, selector }) => (
          <>
            <IonHeader>{info}</IonHeader>
            <IonContent className="content-wide remove-top-padding remove-bottom-padding">
              {selector}
            </IonContent>
          </>
        )}
      </MidweekAssignmentEditor>
    </IonPage>
  );
}

export default EditMidweekAssignmentPage;
