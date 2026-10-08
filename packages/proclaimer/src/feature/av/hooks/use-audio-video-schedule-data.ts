import { and, or, gte, lte, eq, isNull, useLiveQuery } from "@tanstack/react-db";
import { format } from "date-fns";
import { avAssignmentCollection } from "../collections/av-assignment.ts";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { eventCollection, type EventRow } from "@amodeo/proclaimer/feature/event";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { AvAssignment } from "../schemas/av-assignment.ts";
import {
  avAssignmentLabels,
  midweekAVAssignmentIDs,
  midweekAttendantAssignmentIDs,
  weekendAVAssignmentIDs,
  weekendAttendantAssignmentIDs,
} from "../schemas/av-assignment.ts";

export type AvWeekData = {
  weekId: string;
  assignments: Map<string, Publisher | undefined>;
  events: { type: EventRow["type"] }[];
};

export function useAudioVideoScheduleData(
  dateRange: { firstMonday: string; lastMonday: string } | null,
): {
  weeks: AvWeekData[];
  assignmentLabels: Record<string, string>;
  midweekAVAssignmentIDs: readonly string[];
  midweekAttendantAssignmentIDs: readonly string[];
  weekendAVAssignmentIDs: readonly string[];
  weekendAttendantAssignmentIDs: readonly string[];
  isLoading: boolean;
} {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: assignments } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ a: avAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id ?? ""),
                gte(a.week_id, dateRange.firstMonday),
                lte(a.week_id, dateRange.lastMonday),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  // Only fetch events that overlap the selected range (events may span
  // multiple days via end_date, so the overlap check handles null end_date).
  // The time suffix makes the upper bound inclusive for datetime strings.
  const rangeEnd = dateRange ? `${getWeekEnd(dateRange.lastMonday)}T23:59:59` : null;
  const { data: events } = useLiveQuery(
    (q) =>
      dateRange && rangeEnd
        ? q
            .from({ e: eventCollection })
            .where(({ e }) =>
              and(
                eq(e.congregation_id, congregation_id ?? ""),
                lte(e.start_date, rangeEnd),
                or(
                  gte(e.end_date, dateRange.firstMonday),
                  and(isNull(e.end_date), gte(e.start_date, dateRange.firstMonday)),
                ),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const publisherMap = new Map<string, Publisher>();
  for (const publisher of publishers ?? []) {
    if (publisher.id) publisherMap.set(publisher.id, publisher);
  }

  const assignmentsByWeek = new Map<string, AvAssignment[]>();
  for (const assignment of assignments ?? []) {
    const existing = assignmentsByWeek.get(assignment.week_id) ?? [];
    existing.push(assignment);
    assignmentsByWeek.set(assignment.week_id, existing);
  }

  const weeks: AvWeekData[] = [];
  for (const weekId of getWeekIdsInRange(dateRange)) {
    const assignmentMap = new Map<string, Publisher | undefined>();
    for (const assignment of assignmentsByWeek.get(weekId) ?? []) {
      const publisher = publisherMap.get(assignment.participant_id);
      assignmentMap.set(assignment.assignment_id, publisher);
    }

    const weekEvents = (events ?? [])
      .filter((e) => isEventInWeek(e, weekId))
      .map((e) => ({ type: e.type }));

    const hasSpecialEvent = weekEvents.some(
      (e) => e.type === "circuit_assembly" || e.type === "convention",
    );
    if (assignmentMap.size === 0 && !hasSpecialEvent) continue;

    weeks.push({
      weekId,
      assignments: assignmentMap,
      events: weekEvents,
    });
  }

  const isLoading = dateRange
    ? assignments === undefined || publishers === undefined || events === undefined
    : false;

  return {
    weeks,
    assignmentLabels: avAssignmentLabels,
    midweekAVAssignmentIDs,
    midweekAttendantAssignmentIDs,
    weekendAVAssignmentIDs,
    weekendAttendantAssignmentIDs,
    isLoading,
  };
}

// Intentional: range covers only weeks whose Monday falls within the selected
// month. Weekend meetings on the 1st–2nd of the month (when that week began in
// the previous month) are excluded from that month's export by design.
function getWeekIdsInRange(
  dateRange: { firstMonday: string; lastMonday: string } | null,
): string[] {
  if (!dateRange) return [];
  const ids: string[] = [];
  let monday = dateRange.firstMonday;
  while (monday <= dateRange.lastMonday) {
    ids.push(monday);
    const [year, month, day] = monday.split("-").map(Number);
    monday = format(new Date(year, month - 1, day + 7), "yyyy-MM-dd");
  }
  return ids;
}

function getWeekEnd(weekId: string): string {
  const [year, month, day] = weekId.split("-").map(Number);
  return format(new Date(year, month - 1, day + 6), "yyyy-MM-dd");
}

// Compare ISO date strings directly to avoid timezone issues from Date parsing,
// and treat multi-day events as spanning start_date..end_date.
function isEventInWeek(event: EventRow, weekId: string): boolean {
  const eventStart = event.start_date.slice(0, 10);
  const eventEnd = (event.end_date ?? event.start_date).slice(0, 10);
  return eventStart <= getWeekEnd(weekId) && eventEnd >= weekId;
}
