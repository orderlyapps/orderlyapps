import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { MidweekScheduleHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekScheduleContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function SchedulePage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <MidweekScheduleHeader />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <MidweekScheduleContent
          week_id={week_id}
          base_path="/home/midweek-meeting-overseer/schedule"
        />
      </IonContent>
    </IonPage>
  );
}

export default SchedulePage;
