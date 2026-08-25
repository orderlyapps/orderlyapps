import { NumberInputAsync } from "@amodeo/ionic";
import {
  type AttendanceCountField,
  type AttendanceCounts,
  MIDWEEK_FIELDS,
} from "../../../../helper/attendance-fields.ts";

export type MidweekAttendanceEditProps = {
  counts: AttendanceCounts | null;
  on_change: (field: AttendanceCountField, value: number | null) => void;
};

export function MidweekAttendanceEdit({ counts, on_change }: MidweekAttendanceEditProps) {
  return MIDWEEK_FIELDS.map(({ field, label }) => (
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
