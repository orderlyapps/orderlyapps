import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { ReactivatedPublisherEntry } from "../../hooks/use-reactivated-publishers/use-reactivated-publishers.ts";
import { Body } from "../../../../../../ui/components/display/text/body/Body.tsx";

interface ReactivatedPublishersItemProps {
  entry: ReactivatedPublisherEntry;
  lines?: "full" | "inset" | "none";
}

export function ReactivatedPublishersItem({
  entry,
  lines = "full",
}: ReactivatedPublishersItemProps) {
  const months_label = entry.active_months.map((m) => m.label).join(", ");

  return (
    <IonItem
      lines={lines}
      button
      detail
      routerLink={`/home/secretary/publishers/${entry.publisher_id}/reports`}
    >
      <IonLabel className="ion-text-wrap">
        <Body>{entry.full_name}</Body>
      </IonLabel>
      <IonNote slot="end">{months_label}</IonNote>
    </IonItem>
  );
}
