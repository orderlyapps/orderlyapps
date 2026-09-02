import { IonItem, IonLabel } from "@ionic/react";
import type { MissingReportsEntry } from "../../hooks/use-missing-reports/use-missing-reports.ts";

interface MissingReportsItemProps {
  entry: MissingReportsEntry;
}

export function MissingReportsItem({ entry }: MissingReportsItemProps) {
  return (
    <IonItem lines="full">
      <IonLabel className="ion-text-wrap">
        <h2>{entry.full_name}</h2>
        <p>{entry.group_label}</p>
      </IonLabel>
    </IonItem>
  );
}
