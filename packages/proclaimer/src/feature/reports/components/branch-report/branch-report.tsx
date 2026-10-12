import { useState } from "react";
import { IonList } from "@ionic/react";
import { MonthNavigation } from "@amodeo/proclaimer/ui/components/navigation/month-navigation/MonthNavigation";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { getPreviousMonthValue } from "../../utils/report-date.ts";
import { useBranchReportData } from "./hooks/use-branch-report-data.ts";

export function BranchReport() {
  const [month, set_month] = useState(getPreviousMonthValue());
  const { all_active_publishers, isLoading } = useBranchReportData(month);

  return (
    <>
      <MonthNavigation month={month} on_change={set_month} />
      <IonList>
        <LabelValueItem
          label="All Active Publishers"
          value={isLoading ? "…" : String(all_active_publishers)}
        />
      </IonList>
    </>
  );
}
