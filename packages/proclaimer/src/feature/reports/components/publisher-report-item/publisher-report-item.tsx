import { useState } from "react";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import { ReportItem } from "../publisher-record/components/report-item/report-item.tsx";
import { PublisherReportModal } from "../publisher-record/components/publisher-report-modal/publisher-report-modal.tsx";
import { usePublisherReports } from "../publisher-record/hooks/use-publisher-reports.ts";

interface PublisherReportItemProps {
  publisher: Publisher;
  date: string;
}

export function PublisherReportItem({ publisher, date }: PublisherReportItemProps) {
  const [is_open, set_is_open] = useState(false);
  const { confidential_id, reports, isLoading } = usePublisherReports(publisher.id);
  const report = reports.find((r) => r.date.slice(0, 7) === date.slice(0, 7));
  const publisher_name = getPublisherDisplayName(publisher, "last_first");

  return (
    <>
      <ReportItem
        label={publisher_name}
        active={report?.active ?? null}
        aux_pio={report?.aux_pio ?? null}
        hours={report?.hours ?? null}
        bible_studies={report?.bible_studies ?? null}
        credit_hours={report?.credit_hours ?? null}
        comments={report?.comments ?? null}
        button
        detail
        disabled={!confidential_id}
        onClick={() => set_is_open(true)}
      />
      {confidential_id && (
        <PublisherReportModal
          is_open={is_open}
          on_dismiss={() => set_is_open(false)}
          publisher_name={publisher_name}
          confidential_id={confidential_id}
          group_id={publisher.group_id ?? null}
          date={date}
          reports={reports}
          is_loading={isLoading}
        />
      )}
    </>
  );
}
