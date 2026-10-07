export { useAssignments, getAssignmentLabel } from "./hooks/useAssignments.ts";
export type { Assignment, AssignmentType } from "./hooks/useAssignments.ts";
export { groupAssignmentsByMonth } from "./utils/groupAssignmentsByMonth.ts";
export type { AssignmentMonthGroup as AssignmentMonthGroupType } from "./utils/groupAssignmentsByMonth.ts";

export { AssignmentItem } from "./components/assignment-item/AssignmentItem.tsx";
export { AssignmentMonthGroup } from "./components/assignment-month-group/AssignmentMonthGroup.tsx";
export { AssignmentList } from "./components/assignment-list/AssignmentList.tsx";
export { HomeAssignments } from "./components/home-assignments/HomeAssignments.tsx";
