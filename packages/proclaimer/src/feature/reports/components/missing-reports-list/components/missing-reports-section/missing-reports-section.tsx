import { IonCol, IonGrid, IonLabel, IonNote, IonRow } from "@ionic/react";
import type { MissingReportsEntry } from "../../hooks/use-missing-reports/use-missing-reports.ts";
import type { MonthKey } from "../../utils/get-previous-months.ts";
import { MissingReportsItem } from "../missing-reports-item/missing-reports-item.tsx";
import { RESPONSIVE_COL_SIZES } from "../../../../../../ui/types/responsive-col-sizes.ts";

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
  const months_label = previous_months.map((m) => m.label).join(", ");
  const heading = `Missing for the previous ${months} month${months > 1 ? "s" : ""}`;
  const empty_label = `No publishers missing reports for the previous ${months} month${months > 1 ? "s" : ""}.`;

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <IonLabel className="ion-text-wrap">
            <h2>{heading}</h2>
            <IonNote color="medium">{months_label}</IonNote>
          </IonLabel>
        </IonCol>
      </IonRow>
      {isLoading ? (
        <IonRow>
          <IonCol size="12">
            <IonLabel color="medium">Loading...</IonLabel>
          </IonCol>
        </IonRow>
      ) : entries.length === 0 ? (
        <IonRow>
          <IonCol size="12">
            <IonLabel color="medium">{empty_label}</IonLabel>
          </IonCol>
        </IonRow>
      ) : (
        <IonRow>
          {entries.map((entry) => (
            <IonCol key={entry.publisher_id} {...RESPONSIVE_COL_SIZES}>
              <MissingReportsItem entry={entry} />
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
}
