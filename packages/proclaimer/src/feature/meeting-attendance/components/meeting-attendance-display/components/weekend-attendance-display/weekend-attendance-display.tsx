import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { MeetingAttendance } from "../../../../schemas/meeting-attendance.ts";
import { WEEKEND_FIELDS } from "../../../../helper/attendance-fields.ts";

export type WeekendAttendanceDisplayProps = {
  attendance?: MeetingAttendance;
};

export function WeekendAttendanceDisplay({ attendance }: WeekendAttendanceDisplayProps) {
  return WEEKEND_FIELDS.map(({ field, label }) => (
    <IonItem key={field}>
      <IonLabel>{label}</IonLabel>
      <IonNote slot="end">{attendance?.[field] ?? "—"}</IonNote>
    </IonItem>
  ));
}
