import { lazy, Suspense } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useMidweekMeetingChairmanWeeks } from "../../../hooks/use-midweek-meeting-chairman-weeks.ts";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";

const ChairmanDownloadButtons = lazy(() =>
  import("./components/chairman-download-buttons/ChairmanDownloadButtons.tsx").then((m) => ({
    default: m.ChairmanDownloadButtons,
  })),
);

interface MidweekMeetingChairmanHeaderProps {
  week_id: string;
}

export function MidweekMeetingChairmanHeader({ week_id }: MidweekMeetingChairmanHeaderProps) {
  const permissions = usePermissions();
  const { chairman_week_ids } = useMidweekMeetingChairmanWeeks();
  const is_overseer = permissions.has_midweek_meeting_overseer;
  const download_week_ids = is_overseer ? [week_id] : chairman_week_ids;

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>CLAM Chairman</IonTitle>
      {download_week_ids.length > 0 && (
        <IonButtons slot="end">
          <Suspense fallback={<Spinner size="sm" centered={false} />}>
            <ChairmanDownloadButtons week_ids={download_week_ids} />
          </Suspense>
        </IonButtons>
      )}
    </IonToolbar>
  );
}
