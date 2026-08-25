import { z } from "zod";

export const meetingAttendanceSchema = z.object({
  week_id: z.string(),
  congregation_id: z.uuid(),
  weekend_in_person_count: z.number().nullable(),
  weekend_remote_count: z.number().nullable(),
  midweek_in_person_count: z.number().nullable(),
  midweek_remote_count: z.number().nullable(),
});

export type MeetingAttendance = z.infer<typeof meetingAttendanceSchema>;
