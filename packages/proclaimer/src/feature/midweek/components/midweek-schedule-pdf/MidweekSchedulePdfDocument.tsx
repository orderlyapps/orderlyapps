import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { SchedulePdfHeader } from "../schedule-pdf-header/SchedulePdfHeader.tsx";
import { WeekSection } from "./components/week-section/WeekSection.tsx";
import type { WeekScheduleData } from "../../hooks/use-midweek-schedule-data.ts";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 14,
  },
});

type MidweekSchedulePdfDocumentProps = {
  readonly weeks: WeekScheduleData[];
  readonly isLoading: boolean;
  readonly monthDate: string;
  readonly highlightPublisherId?: string;
};

export function MidweekSchedulePdfDocument({
  weeks,
  isLoading,
  monthDate,
  highlightPublisherId,
}: MidweekSchedulePdfDocumentProps) {
  if (isLoading) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={monthDate} />
          <Text style={styles.noData}>Loading schedule data...</Text>
        </Page>
      </Document>
    );
  }

  if (weeks.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={monthDate} />
          <Text style={styles.noData}>No meeting data found for the selected month.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={monthDate} />
        {weeks.map((week) => (
          <WeekSection key={week.weekId} week={week} highlightPublisherId={highlightPublisherId} />
        ))}
      </Page>
    </Document>
  );
}
