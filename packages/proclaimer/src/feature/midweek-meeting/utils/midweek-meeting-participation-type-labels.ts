export type MidweekMeetingParticipationType =
  | "chairman"
  | "prayer"
  | "treasures"
  | "gems"
  | "bible_reading"
  | "apply"
  | "talk"
  | "assistant"
  | "counselor"
  | "living"
  | "cbs_conductor"
  | "cbs_reader";

export const midweekMeetingParticipationTypeLabels: Record<
  MidweekMeetingParticipationType,
  string
> = {
  chairman: "Chairman",
  prayer: "Prayer",
  treasures: "Treasures",
  gems: "Gems",
  bible_reading: "Bible Reading",
  apply: "Apply",
  talk: "Talk",
  assistant: "Assistant",
  counselor: "Counselor",
  living: "Living",
  cbs_conductor: "CBS Conductor",
  cbs_reader: "CBS Reader",
};

export const midweekMeetingParticipationTypes = Object.keys(
  midweekMeetingParticipationTypeLabels,
) as MidweekMeetingParticipationType[];
