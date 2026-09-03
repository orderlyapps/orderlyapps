import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { ServiceYearReport } from "../publisher-report-page/components/service-year-report/service-year-report.tsx";
import type { PublisherRecordData, ServiceYearReportData } from "../publisher-report-page/types.ts";

const styles = StyleSheet.create({
  page: { padding: 18, fontSize: 8 },
});

export interface PublisherRecordEntry {
  publisher: PublisherRecordData;
  reports: ServiceYearReportData[];
}

export function PublisherRecordsPdf({ entries }: { entries: PublisherRecordEntry[] }) {
  return (
    <Document>
      {entries.map((entry, i) => (
        <Page key={i} size="A4" style={styles.page}>
          {entry.reports.map((report, j) => (
            <ServiceYearReport
              key={j}
              publisher={entry.publisher}
              report={report}
              last={j === entry.reports.length - 1}
            />
          ))}
        </Page>
      ))}
    </Document>
  );
}
