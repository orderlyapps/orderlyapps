import type { MidweekAssignment } from "../schemas/midweek-assignment.ts";

export function hasAssignment(
  assignments: MidweekAssignment[] | undefined,
  assignmentId: string,
): boolean {
  if (!assignments) return false;
  return assignments.some((a) => a.assignment_id === assignmentId);
}
