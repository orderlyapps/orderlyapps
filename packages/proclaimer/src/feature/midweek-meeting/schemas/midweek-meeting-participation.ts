import { z } from "zod";

export const midweekMeetingParticipationSchema = z.object({
  participant_id: z.uuid(),
  participation_id: z.enum([
    "chairman",
    "prayer",
    "treasures",
    "gems",
    "bible_reading",
    "apply",
    "talk",
    "assistant",
    "counselor",
    "living",
    "cbs_conductor",
    "cbs_reader",
  ]),
  is_participant: z.boolean().default(true),
});

export type MidweekMeetingParticipation = z.infer<typeof midweekMeetingParticipationSchema>;
