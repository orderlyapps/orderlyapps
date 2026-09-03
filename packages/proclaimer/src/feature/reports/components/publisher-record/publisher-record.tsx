import { useState } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection, getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { PublisherRecordList } from "./components/publisher-record-list/publisher-record-list.tsx";
import { MissingReportsSmsButton } from "./components/missing-reports-sms-button/missing-reports-sms-button.tsx";
import { PublisherRecordModalWrapper } from "./components/publisher-record-modal/publisher-record-modal.tsx";
import { usePublisherReports } from "./hooks/use-publisher-reports.ts";
import { usePublisherRecordData } from "./hooks/use-publisher-record-data.ts";
import { useMissingReportsForPublisher } from "./hooks/use-missing-reports-for-publisher.ts";
import { useOverseerContact } from "./hooks/use-overseer-contact.ts";

const PIONEER_TYPES = ["regular_pioneer"];

export function PublisherRecordContent({ publisher_id }: { publisher_id: string }) {
  const { has_secretary } = usePermissions();
  const [selected_date, set_selected_date] = useState<string | null>(null);
  const { confidential_id, reports, isLoading } = usePublisherReports(publisher_id);

  const { data: publisher_data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
    [publisher_id],
  );

  const publisher = publisher_data?.[0];
  const is_pioneer = PIONEER_TYPES.includes(publisher?.type);
  const publisher_name = publisher ? getPublisherDisplayName(publisher, "last_first") : "";
  const group_id = publisher?.group_id ?? null;

  const { merged, years, getYearKey } = usePublisherRecordData(reports ?? [], is_pioneer);
  const { missing_months, consecutive_missing_count, is_almost_inactive } =
    useMissingReportsForPublisher(reports ?? []);
  const { phone: overseer_phone } = useOverseerContact(group_id);

  if (isLoading) return <Spinner />;

  const show_sms_button = has_secretary && consecutive_missing_count > 0 && overseer_phone !== null;

  return (
    <>
      {show_sms_button && overseer_phone !== null && (
        <MissingReportsSmsButton
          publisher_name={publisher_name}
          missing_months={missing_months}
          is_almost_inactive={is_almost_inactive}
          overseer_phone={overseer_phone}
        />
      )}
      <PublisherRecordList
        merged={merged}
        years={years}
        getYearKey={getYearKey}
        is_pioneer={is_pioneer}
        has_secretary={has_secretary}
        on_select_report={set_selected_date}
      />
      <PublisherRecordModalWrapper
        selected_date={selected_date}
        confidential_id={confidential_id}
        publisher_name={publisher_name}
        group_id={group_id}
        reports={reports}
        on_dismiss={() => set_selected_date(null)}
      />
    </>
  );
}
