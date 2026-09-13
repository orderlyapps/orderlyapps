import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { AvScheduleContent } from "@amodeo/proclaimer/feature/av";

function AvSchedulePage() {
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
          <IonTitle>AV Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <AvScheduleContent week_id={week_id} base_path="/home/av-overseer/schedule" />
      </IonContent>
    </IonPage>
  );
}

export default AvSchedulePage;
