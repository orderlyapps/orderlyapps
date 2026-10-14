import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { MidweekSchedule } from "@amodeo/proclaimer/feature/midweek-meeting";

function SchedulePage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/midweek-meeting-overseer" />
          </IonButtons>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <MidweekSchedule week_id={week_id} base_path="/home/midweek-meeting-overseer/schedule" />
      </IonContent>
    </IonPage>
  );
}

export default SchedulePage;
