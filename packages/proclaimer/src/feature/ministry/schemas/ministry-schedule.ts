import { z } from "zod";

export const ministryScheduleSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid(),
  day_of_week: z.number(), // 1 = Monday ... 7 = Sunday
  start_time: z.string(), // time string from postgres ("HH:MM:SS")
  location: z.string(),
  conductor: z.string(),
  details: z.string(),
  sort_order: z.number(),
});

export type MinistrySchedule = z.infer<typeof ministryScheduleSchema>;

export const MINISTRY_SCHEDULE_DAYS = [
  { day_of_week: 1, label: "Monday" },
  { day_of_week: 2, label: "Tuesday" },
  { day_of_week: 3, label: "Wednesday" },
  { day_of_week: 4, label: "Thursday" },
  { day_of_week: 5, label: "Friday" },
  { day_of_week: 6, label: "Saturday" },
  { day_of_week: 7, label: "Sunday" },
] as const;
