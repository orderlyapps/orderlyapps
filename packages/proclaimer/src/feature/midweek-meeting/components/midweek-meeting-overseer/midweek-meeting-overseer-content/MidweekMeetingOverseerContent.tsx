import { IonList } from "@ionic/react";
import { format, startOfWeek } from "date-fns";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

export function MidweekMeetingOverseerContent() {
  const currentWeekId = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonList>
      <NavItem label="Participation" to="/home/midweek-meeting-overseer/participation" />
      <NavItem label="Schedule" to={`/home/midweek-meeting-overseer/schedule/${currentWeekId}`} />
      <NavItem label="PDF" to="/home/elder/midweek-meeting" />
    </IonList>
  );
}
