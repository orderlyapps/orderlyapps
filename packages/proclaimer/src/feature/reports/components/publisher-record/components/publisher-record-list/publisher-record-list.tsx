import { IonList } from "@ionic/react";
import { YearSection } from "../year-section/year-section.tsx";
import type { ReportEntry } from "../../hooks/use-publisher-record-data.ts";

interface PublisherRecordListProps {
  merged: ReportEntry[];
  years: string[];
  getYearKey: (dateStr: string) => string;
  is_pioneer: boolean;
  has_secretary: boolean;
  on_select_report: (date: string) => void;
}

export function PublisherRecordList({
  merged,
  years,
  getYearKey,
  is_pioneer,
  has_secretary,
  on_select_report,
}: PublisherRecordListProps) {
  return (
    <IonList>
      {years.map((year) => {
        const year_reports = merged.filter((r) => getYearKey(r.date) === year);
        return (
          <YearSection
            key={year}
            year={year}
            year_reports={year_reports}
            is_pioneer={is_pioneer}
            has_secretary={has_secretary}
            on_select_report={on_select_report}
          />
        );
      })}
    </IonList>
  );
}
