import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { ServiceYearReport } from "../publisher-report-page/components/service-year-report/service-year-report.tsx";
import type { PublisherRecordData, ServiceYearReportData } from "../publisher-report-page/types.ts";

const styles = StyleSheet.create({
  page: { padding: 18, fontSize: 8 },
});

interface PublisherRecordPdfProps {
  publisher: PublisherRecordData;
  reports: ServiceYearReportData[];
}

export function PublisherRecordPdf({ publisher, reports }: PublisherRecordPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {reports.map((report, i) => (
          <ServiceYearReport
            key={i}
            publisher={publisher}
            report={report}
            last={i === reports.length - 1}
          />
        ))}
      </Page>
    </Document>
  );
}
