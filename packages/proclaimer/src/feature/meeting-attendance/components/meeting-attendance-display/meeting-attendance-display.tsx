import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
import { BodyText } from "@amodeo/ionic";
import { useMeetingAttendance } from "../../hooks/use-meeting-attendance.ts";
import { MidweekAttendanceDisplay } from "./components/midweek-attendance-display/midweek-attendance-display.tsx";
import { WeekendAttendanceDisplay } from "./components/weekend-attendance-display/weekend-attendance-display.tsx";

export type MeetingAttendanceDisplayProps = {
  week_id: string;
  congregation_id: string;
};

export function MeetingAttendanceDisplay({
  week_id,
  congregation_id,
}: MeetingAttendanceDisplayProps) {
  const { attendance, is_loading } = useMeetingAttendance(week_id, congregation_id);

  if (!is_loading && !attendance) {
    return (
      <BodyText color="medium" italic>
        No attendance recorded for this week.
      </BodyText>
    );
  }

  return (
    <IonList>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Midweek</IonLabel>
        </IonItemDivider>
        <MidweekAttendanceDisplay attendance={attendance} />
      </IonItemGroup>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Weekend</IonLabel>
        </IonItemDivider>
        <WeekendAttendanceDisplay attendance={attendance} />
      </IonItemGroup>
    </IonList>
  );
}
