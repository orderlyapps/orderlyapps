import { useEffect, useState } from "react";
import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
import { meetingAttendanceCollection } from "../../collections/meeting-attendance.js";
import { makeCompositeKey } from "../../../../database/util/composite-key.js";
import {
  type AttendanceCountField,
  type AttendanceCounts,
  ATTENDANCE_FIELDS,
  emptyAttendanceCounts,
} from "../../helper/attendance-fields.ts";
import { useMeetingAttendance } from "../../hooks/use-meeting-attendance.ts";
import { MidweekAttendanceEdit } from "./components/midweek-attendance-edit/midweek-attendance-edit.tsx";
import { WeekendAttendanceEdit } from "./components/weekend-attendance-edit/weekend-attendance-edit.tsx";

export type MeetingAttendanceEditProps = {
  week_id: string;
  congregation_id: string;
  on_saved?: () => void;
};

export function MeetingAttendanceEdit({
  week_id,
  congregation_id,
  on_saved,
}: MeetingAttendanceEditProps) {
  const [counts, setCounts] = useState<AttendanceCounts | null>(null);
  const { attendance, is_loading } = useMeetingAttendance(week_id, congregation_id);

  useEffect(() => {
    setCounts(null);
  }, [week_id, congregation_id]);

  useEffect(() => {
    if (counts !== null || is_loading) return;
    const saved = emptyAttendanceCounts();
    for (const { field } of ATTENDANCE_FIELDS) saved[field] = attendance?.[field] ?? null;
    setCounts(saved);
  }, [attendance, is_loading, counts]);

  const handle_change = (field: AttendanceCountField, value: number | null) => {
    const next = { ...(counts ?? emptyAttendanceCounts()), [field]: value };
    setCounts(next);
    if (attendance) {
      meetingAttendanceCollection.update(makeCompositeKey(week_id, congregation_id), (row) =>
        Object.assign(row, next),
      );
    } else {
      meetingAttendanceCollection.insert({ week_id, congregation_id, ...next });
    }
    on_saved?.();
  };

  return (
    <IonList>
      <IonItemGroup className="ion-margin-vertical">
        <IonItemDivider>
          <IonLabel>Midweek</IonLabel>
        </IonItemDivider>
        <MidweekAttendanceEdit counts={counts} on_change={handle_change} />
      </IonItemGroup>
      <IonItemGroup className="ion-margin-vertical">
        <IonItemDivider>
          <IonLabel>Weekend</IonLabel>
        </IonItemDivider>
        <WeekendAttendanceEdit counts={counts} on_change={handle_change} />
      </IonItemGroup>
    </IonList>
  );
}
