import type { MeetingAttendance } from "../schemas/meeting-attendance.ts";

export type AttendanceCountField = Exclude<keyof MeetingAttendance, "week_id" | "congregation_id">;

export const MIDWEEK_FIELDS: Array<{
  field: AttendanceCountField;
  label: string;
}> = [
  { field: "midweek_in_person_count", label: "Kingdom Hall" },
  { field: "midweek_remote_count", label: "Zoom" },
];

export const WEEKEND_FIELDS: Array<{
  field: AttendanceCountField;
  label: string;
}> = [
  { field: "weekend_in_person_count", label: "Kingdom Hall" },
  { field: "weekend_remote_count", label: "Zoom" },
];

export const ATTENDANCE_FIELDS: Array<{
  field: AttendanceCountField;
  label: string;
}> = [...MIDWEEK_FIELDS, ...WEEKEND_FIELDS];

export type AttendanceCounts = Record<AttendanceCountField, number | null>;

export const emptyAttendanceCounts = (): AttendanceCounts =>
  Object.fromEntries(ATTENDANCE_FIELDS.map(({ field }) => [field, null])) as AttendanceCounts;
