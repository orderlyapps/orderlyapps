import { Fragment } from "react";
import { IonItemDivider, IonLabel } from "@ionic/react";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { ReportItem } from "../report-item/report-item.tsx";
import { formatMonth } from "../../utils/format-month.ts";
import { getCreditedHours } from "../../utils/get-credited-hours.ts";
import type { ReportEntry } from "../../hooks/use-publisher-record-data.ts";

interface YearSectionProps {
  year: string;
  year_reports: ReportEntry[];
  is_pioneer: boolean;
  has_secretary: boolean;
  on_select_report: (date: string) => void;
}

export function YearSection({
  year,
  year_reports,
  is_pioneer,
  has_secretary,
  on_select_report,
}: YearSectionProps) {
  const total_hours = year_reports.reduce((sum, r) => sum + (r.hours ?? 0), 0);
  const total_credited_hours = year_reports.reduce((sum, r) => sum + getCreditedHours(r), 0);

  return (
    <Fragment key={year}>
      <IonItemDivider sticky className="ion-padding">
        <IonLabel>
          <Heading>{year}</Heading>
        </IonLabel>
        {is_pioneer && (
          <div slot="end">
            <Body color="medium" bold>
              {`TOTAL: `}
            </Body>
            <Body color="medium">{`${total_hours} ${total_hours === total_credited_hours ? "" : `(${total_credited_hours})`}`}</Body>
          </div>
        )}
      </IonItemDivider>
      {year_reports.map((report) => (
        <ReportItem
          key={`${report.confidential_id || "placeholder"}-${report.date}`}
          label={formatMonth(report.date).toUpperCase()}
          active={report.active}
          aux_pio={report.aux_pio}
          hours={report.hours}
          bible_studies={report.bible_studies}
          credit_hours={report.credit_hours}
          comments={report.comments}
          button={has_secretary}
          detail={has_secretary}
          onClick={has_secretary ? () => on_select_report(report.date) : undefined}
        />
      ))}
      <Space size="xl" />
    </Fragment>
  );
}
