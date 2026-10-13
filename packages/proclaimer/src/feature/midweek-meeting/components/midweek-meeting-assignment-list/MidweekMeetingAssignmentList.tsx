import { IonList } from "@ionic/react";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { useMidweekMeetingAssignments } from "../../hooks/use-midweek-meeting-assignments.ts";
import { MidweekMeetingAssignmentSchool } from "../midweek-meeting-assignment-school/MidweekMeetingAssignmentSchool.tsx";
import type { MidweekMeetingAssignmentId } from "../../schemas/midweek-meeting-assignment.ts";

type SchoolConfig = {
  key: string;
  label: string;
  chairman_id: MidweekMeetingAssignmentId;
};

const schools: SchoolConfig[] = [
  { key: "school_1", label: "Main Hall", chairman_id: "chairman_1" },
  { key: "school_2", label: "Second School", chairman_id: "chairman_2" },
  { key: "school_3", label: "Third School", chairman_id: "chairman_3" },
];

type MidweekMeetingAssignmentListProps = {
  week_id: string;
};

export function MidweekMeetingAssignmentList({ week_id }: MidweekMeetingAssignmentListProps) {
  const { meeting, participant, has_school_2, has_school_3 } =
    useMidweekMeetingAssignments(week_id);
  const week_label = getTheocraticWeekLabel(week_id, { format: "week-range" });

  if (!meeting) {
    return null;
  }

  const active_schools = schools.filter(
    (_, index) => index === 0 || (index === 1 && has_school_2) || (index === 2 && has_school_3),
  );

  return (
    <IonList>
      {active_schools.map((school) => (
        <MidweekMeetingAssignmentSchool
          key={school.key}
          week_label={week_label}
          school_key={school.key}
          school_label={school.label}
          chairman_id={school.chairman_id}
          meeting={meeting}
          participant={participant}
        />
      ))}
    </IonList>
  );
}
