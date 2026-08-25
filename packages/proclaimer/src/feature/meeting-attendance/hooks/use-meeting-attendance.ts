import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { meetingAttendanceCollection } from "../collections/meeting-attendance.ts";

export function useMeetingAttendance(week_id: string, congregation_id: string) {
  const { data } = useLiveQuery(
    (q) =>
      q
        .from({ ma: meetingAttendanceCollection })
        .where(({ ma }) => and(eq(ma.week_id, week_id), eq(ma.congregation_id, congregation_id))),
    [week_id, congregation_id],
  );
  return { attendance: data?.[0], is_loading: data === undefined };
}
