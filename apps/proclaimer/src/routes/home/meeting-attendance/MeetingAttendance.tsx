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
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import {
  MeetingAttendanceDisplay,
  MeetingAttendanceEdit,
} from "@amodeo/proclaimer/feature/meeting-attendance";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";

function MeetingAttendancePage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const permissions = usePermissions();
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const can_edit =
    permissions.has_meeting_attendance ||
    permissions.has_congregation_admin ||
    permissions.is_super_admin;

  const can_read =
    permissions.can_read_meeting_attendance ||
    permissions.has_congregation_admin ||
    permissions.is_super_admin;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Meeting Attendance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="remove-top-padding">
        <WeekNavigation week_id={week_id} />
        {congregation_id &&
          (can_edit ? (
            <MeetingAttendanceEdit week_id={week_id} congregation_id={congregation_id} />
          ) : can_read ? (
            <MeetingAttendanceDisplay week_id={week_id} congregation_id={congregation_id} />
          ) : null)}
      </IonContent>
    </IonPage>
  );
}

export default MeetingAttendancePage;
