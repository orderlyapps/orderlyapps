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
import { MidweekMeetingContent } from "@amodeo/proclaimer/feature/midweek";

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
        <MidweekMeetingContent week_id={week_id} base_path="/schedules/midweek-meeting" />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingPage;
