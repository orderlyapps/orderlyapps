import { NumberInputAsync } from "@amodeo/ionic";
import {
  type AttendanceCountField,
  type AttendanceCounts,
  WEEKEND_FIELDS,
} from "../../../../helper/attendance-fields.ts";

export type WeekendAttendanceEditProps = {
  counts: AttendanceCounts | null;
  on_change: (field: AttendanceCountField, value: number | null) => void;
};

export function WeekendAttendanceEdit({ counts, on_change }: WeekendAttendanceEditProps) {
  return WEEKEND_FIELDS.map(({ field, label }) => (
    <NumberInputAsync
      key={field}
      label={label}
      value={counts?.[field] ?? ""}
      onIonChange={(event) => {
        const raw = event.detail.value;
        on_change(field, raw === "" || raw == null ? null : Number(raw));
      }}
    />
  ));
}
