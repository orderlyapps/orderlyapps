import { and, gte, lte, eq, useLiveQuery } from "@tanstack/react-db";
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

  const { data: events } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ e: eventCollection })
            .where(({ e }) => eq(e.congregation_id, congregation_id ?? ""))
        : undefined,
    [congregation_id],
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

// Compare ISO date strings directly to avoid timezone issues from Date parsing,
// and treat multi-day events as spanning start_date..end_date.
function isEventInWeek(event: EventRow, weekId: string): boolean {
  const [year, month, day] = weekId.split("-").map(Number);
  const weekEnd = format(new Date(year, month - 1, day + 6), "yyyy-MM-dd");

  const eventStart = event.start_date.slice(0, 10);
  const eventEnd = (event.end_date ?? event.start_date).slice(0, 10);
  return eventStart <= weekEnd && eventEnd >= weekId;
}
