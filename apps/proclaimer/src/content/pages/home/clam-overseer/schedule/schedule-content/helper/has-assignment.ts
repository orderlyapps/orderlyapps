import type { MidweekAssignment } from "@amodeo/proclaimer/feature/midweek";

export function hasAssignment(
  assignments: MidweekAssignment[] | undefined,
  assignmentId: string,
): boolean {
  if (!assignments) return false;
  return assignments.some((a) => a.assignment_id === assignmentId);
}
