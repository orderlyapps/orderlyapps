import type { Report } from "../../../../schemas/report.ts";
import { PublisherReportModal } from "../publisher-report-modal/publisher-report-modal.tsx";

interface PublisherRecordModalWrapperProps {
  selected_date: string | null;
  confidential_id: string | undefined;
  publisher_name: string;
  group_id: string | null;
  reports: Report[] | undefined;
  on_dismiss: () => void;
}

export function PublisherRecordModalWrapper({
  selected_date,
  confidential_id,
  publisher_name,
  group_id,
  reports,
  on_dismiss,
}: PublisherRecordModalWrapperProps) {
  if (!selected_date || !confidential_id) return null;

  const existing_report = reports?.find((r) => r.date === selected_date);

  return (
    <PublisherReportModal
      is_open
      on_dismiss={on_dismiss}
      publisher_name={publisher_name}
      confidential_id={confidential_id}
      group_id={group_id}
      date={selected_date}
      existing_report={existing_report as Report | undefined}
    />
  );
}
