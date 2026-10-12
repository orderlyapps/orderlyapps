import { and, eq, gte, lte, useLiveQuery } from "@tanstack/react-db";
import { meetingAttendanceCollection } from "../collections/meeting-attendance.ts";

export function useAverageWeekendAttendance(
  dateRange: { firstMonday: string; lastMonday: string } | null,
  congregation_id: string,
) {
  const { data } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ ma: meetingAttendanceCollection })
            .where(({ ma }) =>
              and(
                eq(ma.congregation_id, congregation_id),
                gte(ma.week_id, dateRange.firstMonday),
                lte(ma.week_id, dateRange.lastMonday),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const totals = (data ?? []).flatMap((row) => {
    const { weekend_in_person_count, weekend_remote_count } = row;
    if (weekend_in_person_count === null && weekend_remote_count === null) return [];
    return [(weekend_in_person_count ?? 0) + (weekend_remote_count ?? 0)];
  });

  const meetings_counted = totals.length;
  const average =
    meetings_counted === 0
      ? null
      : totals.reduce((sum, total) => sum + total, 0) / meetings_counted;

  return { average, meetings_counted, is_loading: dateRange ? data === undefined : false };
}
