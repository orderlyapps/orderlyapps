import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingAssignmentCollection } from "../collections/midweek-meeting-assignment.ts";
import { midweekMeetingDataCollection } from "../collections/midweek-meeting-data.ts";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { MidweekMeetingData } from "../schemas/midweek-meeting-data.ts";
import type { MidweekMeetingAssignmentId } from "../schemas/midweek-meeting-assignment.ts";

export type MidweekMeetingParticipantAssignment = {
  assignment_id: MidweekMeetingAssignmentId;
  participant: Publisher;
};

export function useMidweekMeetingAssignments(week_id: string) {
  const { data: meeting_data } = useLiveQuery(
    (q) => q.from({ m: midweekMeetingDataCollection }).where(({ m }) => eq(m.week_id, week_id)),
    [week_id],
  );

  const { data: assignment_data } = useLiveQuery(
    (q) =>
      q
        .from({ a: midweekMeetingAssignmentCollection })
        .join({ p: publisherCollection }, ({ a, p }) => eq(a.participant_id, p.id))
        .where(({ a }) => eq(a.week_id, week_id))
        .select(({ a, p }) => ({
          assignment_id: a.assignment_id,
          participant: p,
        })),
    [week_id],
  );

  const meeting = (meeting_data as MidweekMeetingData[] | undefined)?.[0];
  const assignments = (assignment_data as MidweekMeetingParticipantAssignment[] | undefined) ?? [];

  const participant = (assignment_id: MidweekMeetingAssignmentId) =>
    assignments.find((a) => a.assignment_id === assignment_id)?.participant;

  const has_school_2 = assignments.some((a) => a.assignment_id === "chairman_2");
  const has_school_3 = assignments.some((a) => a.assignment_id === "chairman_3");

  return { meeting, assignments, participant, has_school_2, has_school_3 };
}
