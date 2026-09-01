import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@amodeo/proclaimer/feature/weekend";
import { speakerAssignmentCollection } from "@amodeo/proclaimer/database/collections/speaker-assignment";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { outlineCollection } from "@amodeo/proclaimer/database/collections/outline";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Outline } from "@amodeo/proclaimer/database/schemas/outline";
import type { WeekendAssignmentID } from "@amodeo/proclaimer/feature/weekend";

export type WeekendAssignmentWithPublisher = {
  assignment_id: WeekendAssignmentID;
  participant: Publisher;
};

export type SpeakerAssignmentWithPublisher = {
  speaker: Publisher;
  outline?: Outline;
};

export function useWeekendAssignments(week_id: string) {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id ?? "";

  const { data: assignment_data } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .join({ p: publisherCollection }, ({ wa, p }) => eq(wa.participant_id, p.id))
        .where(({ wa }) => and(eq(wa.week_id, week_id), eq(wa.congregation_id, congregation_id)))
        .select(({ wa, p }) => ({
          assignment_id: wa.assignment_id,
          participant: p,
        })),
    [week_id, congregation_id],
  );

  const { data: speaker_data } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .join({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p.id))
        .leftJoin({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o.id))
        .where(({ sa }) => and(eq(sa.week_id, week_id), eq(sa.congregation_id, congregation_id)))
        .select(({ p, o }) => ({
          speaker: p,
          outline: o,
        })),
    [week_id, congregation_id],
  );

  const assignments = (assignment_data as WeekendAssignmentWithPublisher[] | undefined) ?? [];

  const participant = (assignment_id: WeekendAssignmentID) =>
    assignments.find((a) => a.assignment_id === assignment_id)?.participant;

  const speaker_assignment = (speaker_data as SpeakerAssignmentWithPublisher[] | undefined)?.[0];

  return { assignments, participant, speaker_assignment };
}
