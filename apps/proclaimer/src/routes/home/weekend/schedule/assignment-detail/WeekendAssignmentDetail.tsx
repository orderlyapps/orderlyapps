import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import {
  WeekendAssignmentDetailHeader,
  WeekendAssignmentDetailContent,
} from "@amodeo/proclaimer/feature/weekend";

function WeekendAssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <WeekendAssignmentDetailHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/weekend/schedule/${week_id}`}
        />
      </IonHeader>
      <WeekendAssignmentDetailContent week_id={week_id} assignment_id={assignment_id} />
    </IonPage>
  );
}

export default WeekendAssignmentDetailPage;
