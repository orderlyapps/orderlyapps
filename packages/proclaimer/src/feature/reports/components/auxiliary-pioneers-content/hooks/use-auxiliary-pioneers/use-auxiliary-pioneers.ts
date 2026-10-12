import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "../../../../../publisher/collections/publisher.ts";
import { useStoredCongregation } from "../../../../../congregation/utils/use-stored-congregation.ts";
import { publisherLocalCollection } from "../../../../../publisher-local/collections/publisher-local.ts";
import { reportCollection } from "../../../../collections/report.ts";
import type { Publisher } from "../../../../../publisher/schemas/publisher.ts";
import type { Report } from "../../../../schemas/report.ts";
import { getPublisherDisplayName } from "../../../../../publisher/utils/publisher-name.ts";

interface LocalPublisherData {
  publisher_id: string;
  confidential_id: string;
}

export interface AuxiliaryPioneerEntry {
  publisher_id: string;
  full_name: string;
  continuous: boolean;
  hours: number | null;
  bible_studies: number | null;
}

function sortByName(a: AuxiliaryPioneerEntry, b: AuxiliaryPioneerEntry): number {
  return a.full_name.localeCompare(b.full_name);
}

/**
 * Finds auxiliary pioneers for a given month (YYYY-MM) — any non-archived
 * publisher with a report flagged `aux_pio` for that month. Publishers whose
 * `type` is `"continuous_auxiliary"` are also included, but only when viewing
 * the current or next month (before their reports exist).
 */
export function useAuxiliaryPioneers(month: string) {
  const month_date = `${month}-01`;

  const now = new Date();
  const current_month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const next_month_date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const next_month = `${next_month_date.getFullYear()}-${String(next_month_date.getMonth() + 1).padStart(2, "0")}`;
  const show_continuous = month === current_month || month === next_month;

  const congregation_id = useStoredCongregation()?.id;

  const { data: publishers, isLoading: publishers_loading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ p: publisherCollection })
            .where(({ p }) => eq(p.congregation_id, congregation_id))
        : undefined,
    [congregation_id],
  );
  const { data: local_data, isLoading: local_loading } = useLiveQuery(
    (q) => q.from({ pl: publisherLocalCollection }),
    [],
  );
  const { data: month_reports, isLoading: reports_loading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ r: reportCollection })
            .where(({ r }) => and(eq(r.congregation_id, congregation_id), eq(r.date, month_date)))
        : undefined,
    [congregation_id, month_date],
  );

  const isLoading = publishers_loading || local_loading || reports_loading;

  const all_publishers = (publishers ?? []) as Publisher[];
  const all_local = (local_data ?? []) as LocalPublisherData[];
  const all_reports = (month_reports ?? []) as Report[];

  const publisher_id_by_confidential = new Map<string, string>();
  for (const l of all_local) publisher_id_by_confidential.set(l.confidential_id, l.publisher_id);

  const report_by_publisher_id = new Map<string, Report>();
  for (const r of all_reports) {
    const publisher_id = publisher_id_by_confidential.get(r.confidential_id);
    if (publisher_id) report_by_publisher_id.set(publisher_id, r);
  }

  const entries: AuxiliaryPioneerEntry[] = [];

  for (const publisher of all_publishers) {
    if (!publisher.id || publisher.archived_at) continue;

    const continuous = show_continuous && publisher.type === "continuous_auxiliary";
    const report = report_by_publisher_id.get(publisher.id);
    if (!continuous && !report?.aux_pio) continue;

    entries.push({
      publisher_id: publisher.id,
      full_name: getPublisherDisplayName(publisher),
      continuous,
      hours: report?.hours ?? null,
      bible_studies: report?.bible_studies ?? null,
    });
  }

  entries.sort(sortByName);

  return { entries, isLoading, show_continuous };
}
