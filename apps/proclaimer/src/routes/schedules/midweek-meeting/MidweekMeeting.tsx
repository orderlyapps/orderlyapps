import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { MidweekSchedule } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekAssignmentsDisplay, MidweekAttendantsDisplay } from "@amodeo/proclaimer/feature/av";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

function MidweekMeetingPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Midweek Meeting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <MidweekSchedule week_id={week_id} base_path="/schedules/midweek-meeting" />
        <IonList inset>
          <Space />
          <MidweekAssignmentsDisplay week_id={week_id} />
          <Space />
          <MidweekAttendantsDisplay week_id={week_id} />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingPage;
