import { View } from "@react-pdf/renderer";
import type { MonthReport } from "../../types.ts";
import { HeaderRow } from "./header-row.tsx";
import { DataRow } from "./data-row.tsx";
import { TotalRow } from "./total-row.tsx";

export function ReportTable({
  months,
  total_hours,
  service_year,
}: {
  months: MonthReport[];
  total_hours: number;
  service_year: string;
}) {
  return (
    <View>
      <HeaderRow service_year={service_year} />
      {months.map((report, i) => (
        <DataRow key={i} report={report} isLast={i === months.length - 1} />
      ))}
      <TotalRow total_hours={total_hours} />
    </View>
  );
}
