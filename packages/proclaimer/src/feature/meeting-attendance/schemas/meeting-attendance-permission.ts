import { z } from "zod";

export const meetingAttendancePermissionSchema = z.object({
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  can_read: z.boolean(),
  can_edit: z.boolean(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type MeetingAttendancePermission = z.infer<typeof meetingAttendancePermissionSchema>;
