import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { MeetingAttendance } from "../../../../schemas/meeting-attendance.ts";
import { MIDWEEK_FIELDS } from "../../../../helper/attendance-fields.ts";

export type MidweekAttendanceDisplayProps = {
  attendance?: MeetingAttendance;
};

export function MidweekAttendanceDisplay({ attendance }: MidweekAttendanceDisplayProps) {
  return MIDWEEK_FIELDS.map(({ field, label }) => (
    <IonItem key={field}>
      <IonLabel>{label}</IonLabel>
      <IonNote slot="end">{attendance?.[field] ?? "—"}</IonNote>
    </IonItem>
  ));
}
