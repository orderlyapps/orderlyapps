import { View } from "@react-pdf/renderer";
import { ServiceYearReport } from "../service-year-report/service-year-report.tsx";
import type { PublisherReportEntry } from "../../types.ts";

interface PublisherPageProps {
  entry: PublisherReportEntry;
  anchor_id: string;
}

export function PublisherPage({ entry, anchor_id }: PublisherPageProps) {
  return (
    <View id={anchor_id}>
      {entry.reports.map((report, j) => (
        <ServiceYearReport
          key={j}
          publisher={entry.publisher}
          report={report}
          last={j === entry.reports.length - 1}
        />
      ))}
    </View>
  );
}
