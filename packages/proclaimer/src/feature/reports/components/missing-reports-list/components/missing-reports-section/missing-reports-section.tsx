import { IonCol, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import type { MissingReportsEntry } from "../../hooks/use-missing-reports/use-missing-reports.ts";
import type { MonthKey } from "../../utils/get-previous-months.ts";
import { MissingReportsItem } from "../missing-reports-item/missing-reports-item.tsx";
import { Heading } from "../../../../../../ui/components/display/text/heading/Heading.tsx";
import { Body } from "../../../../../../ui/components/display/text/body/Body.tsx";

interface MissingReportsSectionProps {
  months: number;
  entries: MissingReportsEntry[];
  previous_months: MonthKey[];
  isLoading: boolean;
}

export function MissingReportsSection({
  months,
  entries,
  previous_months,
  isLoading,
}: MissingReportsSectionProps) {
  const months_label = [...previous_months]
    .reverse()
    .map((m) => m.label)
    .join(" | ");
  const heading = `${months} Month${months > 1 ? "s" : ""}`;

  return (
    <IonCol sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="4" sizeXl="4">
      <IonItem lines="none">
        <IonLabel className="ion-text-wrap">
          <Heading>{heading}</Heading>
          <br />
          <IonNote color="medium">{months_label}</IonNote>
        </IonLabel>
      </IonItem>
      <IonList>
        {isLoading ? (
          <IonItem lines="none">
            <IonLabel color="medium">Loading...</IonLabel>
          </IonItem>
        ) : entries.length === 0 ? (
          <IonItem lines="none">
            <IonLabel>
              <Body size="sm">N/A</Body>
            </IonLabel>
          </IonItem>
        ) : (
          entries.map((entry, i) => (
            <MissingReportsItem
              key={entry.publisher_id}
              entry={entry}
              lines={i === entries.length - 1 ? "none" : "full"}
            />
          ))
        )}
      </IonList>
    </IonCol>
  );
}
