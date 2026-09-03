import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { MissingReportsEntry } from "../../hooks/use-missing-reports/use-missing-reports.ts";
import { Body } from "../../../../../../ui/components/display/text/body/Body.tsx";

interface MissingReportsItemProps {
  entry: MissingReportsEntry;
  lines?: "full" | "inset" | "none";
}

export function MissingReportsItem({ entry, lines = "full" }: MissingReportsItemProps) {
  return (
    <IonItem
      lines={lines}
      button
      detail
      routerLink={`/home/secretary/missing-reports/${entry.publisher_id}`}
    >
      <IonLabel className="ion-text-wrap">
        <Body>{entry.full_name}</Body>
      </IonLabel>
      <IonNote slot="end">{entry.group_label}</IonNote>
    </IonItem>
  );
}
