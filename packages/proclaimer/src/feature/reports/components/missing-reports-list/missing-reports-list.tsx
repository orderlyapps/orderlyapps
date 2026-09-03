import { useMissingReports } from "./hooks/use-missing-reports/use-missing-reports.ts";
import { MissingReportsSection } from "./components/missing-reports-section/missing-reports-section.tsx";
import { IonGrid, IonRow } from "@ionic/react";

const MONTH_COUNTS = [6, 5, 4, 3, 2, 1];

export function MissingReportsList() {
  const { buckets, isLoading } = useMissingReports(MONTH_COUNTS);

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-around">
        {MONTH_COUNTS.map((months) => {
          const bucket = buckets.get(months);
          return (
            <MissingReportsSection
              key={months}
              months={months}
              entries={bucket?.entries ?? []}
              previous_months={bucket?.previous_months ?? []}
              isLoading={isLoading}
            />
          );
        })}
      </IonRow>
    </IonGrid>
  );
}
