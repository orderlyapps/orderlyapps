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
import { WeekendMeetingContent } from "@amodeo/proclaimer/feature/weekend";

function WeekendMeetingPage() {
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
          <IonTitle>Weekend Meeting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <WeekendMeetingContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default WeekendMeetingPage;
