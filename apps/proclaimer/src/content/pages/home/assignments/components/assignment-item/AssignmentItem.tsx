import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { getMidweekMeetingUrl } from "@amodeo/proclaimer/feature/midweek";
import type { Assignment } from "../../useAssignments";

interface AssignmentItemProps {
  assignment: Assignment;
}

export function AssignmentItem({ assignment }: AssignmentItemProps) {
  const isMidweek = assignment.type === "midweek";
  const url = isMidweek ? getMidweekMeetingUrl(assignment.week_id) : undefined;

  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(assignment.week_id, {
        format: "week-range",
        useRelativeWeek: true,
        relativeWeekStyle: "append",
      })}
      value={assignment.label}
      detail={isMidweek}
      on_click={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
    />
  );
}
