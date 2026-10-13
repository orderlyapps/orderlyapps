import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { MidweekMeetingChairmanHeader } from "@amodeo/proclaimer/feature/midweek-meeting";
import { MidweekMeetingChairmanContent } from "@amodeo/proclaimer/feature/midweek-meeting";

function MidweekMeetingChairmanPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingChairmanHeader week_id={week_id} />
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingChairmanContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingChairmanPage;
