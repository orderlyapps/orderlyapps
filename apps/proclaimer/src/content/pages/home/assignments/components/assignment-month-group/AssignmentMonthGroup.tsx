import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import type { AssignmentMonthGroup } from "../../groupAssignmentsByMonth";
import { AssignmentItem } from "../assignment-item/AssignmentItem";

interface AssignmentMonthGroupProps {
  group: AssignmentMonthGroup;
}

export function AssignmentMonthGroup({ group }: AssignmentMonthGroupProps) {
  return (
    <IonList>
      <IonItem>
        <IonLabel className="ion-margin">
          <Body size="xl" color="primary">
            {group.label.toUpperCase()}
          </Body>
        </IonLabel>
      </IonItem>
      {group.assignments.map((assignment) => (
        <AssignmentItem key={assignment.id} assignment={assignment} />
      ))}
      <Space size="sm" />
    </IonList>
  );
}
