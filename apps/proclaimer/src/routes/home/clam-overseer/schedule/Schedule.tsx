import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { ScheduleHeader } from "@amodeo/proclaimer/feature/midweek";
import { ScheduleContent } from "@amodeo/proclaimer/feature/midweek";

function SchedulePage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <ScheduleHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <ScheduleContent week_id={week_id} base_path="/home/clam-overseer/schedule" />
      </IonContent>
    </IonPage>
  );
}

export default SchedulePage;
