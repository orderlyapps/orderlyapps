import { lazy, Suspense } from "react";
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
import {
  MidweekMeetingChairmanContent,
  useMidweekMeetingChairmanWeeks,
} from "@amodeo/proclaimer/feature/midweek-meeting";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";

const ChairmansOutlineDownloadButtons = lazy(() =>
  import("@amodeo/proclaimer/feature/midweek-meeting").then((m) => ({
    default: m.ChairmansOutlineDownloadButtons,
  })),
);

function MidweekMeetingChairmanPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const permissions = usePermissions();
  const { chairman_week_ids } = useMidweekMeetingChairmanWeeks();
  const is_overseer = permissions.has_midweek_meeting_overseer;
  const download_week_ids = is_overseer ? [week_id] : chairman_week_ids;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>CLAM Chairman</IonTitle>
          {download_week_ids.length > 0 && (
            <IonButtons slot="end">
              <Suspense fallback={<Spinner size="sm" centered={false} />}>
                <ChairmansOutlineDownloadButtons week_ids={download_week_ids} />
              </Suspense>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <MidweekMeetingChairmanContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingChairmanPage;
