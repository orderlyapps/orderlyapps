import type { AvAssignmentID } from "../schemas/av-assignment.ts";
import type { AvParticipationType } from "./av-participation-type-labels.ts";

export const avParticipationTypeMap: Record<AvAssignmentID, AvParticipationType> = {
  video_midweek: "video",
  audio_midweek: "audio",
  platform_midweek: "platform",
  microphone_1_midweek: "microphone",
  microphone_2_midweek: "microphone",
  entrance_midweek: "entrance",
  auditorium_midweek: "auditorium",
  zoom_midweek: "zoom",
  video_weekend: "video",
  audio_weekend: "audio",
  platform_weekend: "platform",
  microphone_1_weekend: "microphone",
  microphone_2_weekend: "microphone",
  entrance_weekend: "entrance",
  auditorium_weekend: "auditorium",
  zoom_weekend: "zoom",
};

export const avParticipationAssignmentIds: Record<AvParticipationType, AvAssignmentID[]> = (() => {
  const result: Partial<Record<AvParticipationType, AvAssignmentID[]>> = {};
  for (const [id, type] of Object.entries(avParticipationTypeMap) as [
    AvAssignmentID,
    AvParticipationType,
  ][]) {
    if (!result[type]) result[type] = [];
    result[type]!.push(id);
  }
  return result as Record<AvParticipationType, AvAssignmentID[]>;
})();
