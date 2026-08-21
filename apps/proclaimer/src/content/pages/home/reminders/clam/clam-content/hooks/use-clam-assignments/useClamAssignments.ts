import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekAssignmentCollection } from "@amodeo/proclaimer/database/collections/midweek-assignment";
import { midweekMeetingDataCollection } from "@amodeo/proclaimer/database/collections/midweek-meeting-data";
import { publisherCollection } from "@amodeo/proclaimer/feature/publishers/publishers-collection/publisher-collection";
import type { Publisher } from "@amodeo/proclaimer/feature/publishers/publisher-schema";
import type { MidweekMeetingData } from "@amodeo/proclaimer/database/schemas/midweek-meeting-data";
import type { MidweekAssignmentId } from "@amodeo/proclaimer/database/schemas/midweek-assignment";

export type ClamAssignment = {
  assignment_id: MidweekAssignmentId;
  participant: Publisher;
};

export function useClamAssignments(week_id: string) {
  const { data: meeting_data } = useLiveQuery(
    (q) => q.from({ m: midweekMeetingDataCollection }).where(({ m }) => eq(m.week_id, week_id)),
    [week_id],
  );

  const { data: assignment_data } = useLiveQuery(
    (q) =>
      q
        .from({ a: midweekAssignmentCollection })
        .join({ p: publisherCollection }, ({ a, p }) => eq(a.participant_id, p.id))
        .where(({ a }) => eq(a.week_id, week_id))
        .select(({ a, p }) => ({
          assignment_id: a.assignment_id,
          participant: p,
        })),
    [week_id],
  );

  const meeting = (meeting_data as MidweekMeetingData[] | undefined)?.[0];
  const assignments = (assignment_data as ClamAssignment[] | undefined) ?? [];

  const participant = (assignment_id: MidweekAssignmentId) =>
    assignments.find((a) => a.assignment_id === assignment_id)?.participant;

  const has_school_2 = assignments.some((a) => a.assignment_id === "chairman_2");
  const has_school_3 = assignments.some((a) => a.assignment_id === "chairman_3");

  return { meeting, assignments, participant, has_school_2, has_school_3 };
}
