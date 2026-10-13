import type { MidweekMeetingAssignment } from "../schemas/midweek-meeting-assignment.ts";

export function hasAssignment(
  assignments: MidweekMeetingAssignment[] | undefined,
  assignmentId: string,
): boolean {
  if (!assignments) return false;
  return assignments.some((a) => a.assignment_id === assignmentId);
}
