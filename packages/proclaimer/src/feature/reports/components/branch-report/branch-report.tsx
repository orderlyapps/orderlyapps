import { useState } from "react";
import { MonthNavigation } from "@amodeo/proclaimer/ui/components/navigation/month-navigation/MonthNavigation";
import { getPreviousMonthValue } from "../../utils/report-date.ts";

export function BranchReport() {
  const [month, set_month] = useState(getPreviousMonthValue());

  return (
    <>
      <MonthNavigation month={month} on_change={set_month} />
    </>
  );
}
