import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { useAssignments } from "../../hooks/useAssignments.ts";
import { groupAssignmentsByMonth } from "../../utils/groupAssignmentsByMonth.ts";
import { AssignmentMonthGroup } from "../assignment-month-group/AssignmentMonthGroup.tsx";

export function AssignmentsContent() {
  const { assignments, is_loading } = useAssignments();

  if (is_loading) {
    return <Spinner className="flex-center" />;
  }

  if (!assignments.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No assignments</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const groups = groupAssignmentsByMonth(assignments);

  return (
    <>
      {groups.map((group) => (
        <AssignmentMonthGroup key={group.label} group={group} />
      ))}
      <Space />
    </>
  );
}
