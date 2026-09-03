import type { PublisherReportEntry } from "../publisher-report-page/types.ts";

export interface GroupedReportEntry {
  group_label: string;
  group_id: string;
  entries: PublisherReportEntry[];
}
