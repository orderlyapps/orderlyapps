import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "../../../../../publisher/collections/publisher.ts";
import { publisherLocalCollection } from "../../../../../publisher-local/collections/publisher-local.ts";
import { reportCollection } from "../../../../collections/report.ts";
import type { Report } from "../../../../schemas/report.ts";
import type { Publisher } from "../../../../../publisher/schemas/publisher.ts";
import { getPublisherDisplayName } from "../../../../../publisher/utils/publisher-name.ts";
import {
  getPreviousMonths,
  type MonthKey,
} from "../../../missing-reports-list/utils/get-previous-months.ts";

interface LocalPublisherData {
  publisher_id: string;
  confidential_id: string;
}

export interface ReactivatedPublisherEntry {
  publisher_id: string;
  full_name: string;
  active_months: MonthKey[];
}

const LOOKBACK_MONTHS = 6;

function sortByName(a: ReactivatedPublisherEntry, b: ReactivatedPublisherEntry): number {
  return a.full_name.localeCompare(b.full_name);
}

/**
 * Finds reactivated publishers — publishers whose `type` is `"inactive"` but
 * who have at least one report marked `active: true` within the previous six
 * months. Each entry includes the specific months in which they were active.
 */
export function useReactivatedPublishers() {
  const { data: publishers, isLoading: publishers_loading } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }),
    [],
  );
  const { data: local_data, isLoading: local_loading } = useLiveQuery(
    (q) => q.from({ pl: publisherLocalCollection }),
    [],
  );
  const { data: reports, isLoading: reports_loading } = useLiveQuery(
    (q) => q.from({ r: reportCollection }),
    [],
  );

  const isLoading = publishers_loading || local_loading || reports_loading;

  const all_publishers = (publishers ?? []) as Publisher[];
  const all_local = (local_data ?? []) as LocalPublisherData[];
  const all_reports = (reports ?? []) as Report[];

  const local_map = new Map<string, LocalPublisherData>();
  for (const l of all_local) local_map.set(l.publisher_id, l);

  const previous_months = getPreviousMonths(LOOKBACK_MONTHS);
  const previous_month_keys = new Set(previous_months.map((m) => m.key));

  // Map confidential_id -> set of active month keys within the lookback window
  const active_months_by_confidential = new Map<string, Set<string>>();
  for (const r of all_reports) {
    if (!r.active) continue;
    const month_key = r.date.slice(0, 7);
    if (!previous_month_keys.has(month_key)) continue;
    const set = active_months_by_confidential.get(r.confidential_id);
    if (set) set.add(month_key);
    else active_months_by_confidential.set(r.confidential_id, new Set([month_key]));
  }

  const entries: ReactivatedPublisherEntry[] = [];

  for (const publisher of all_publishers) {
    if (!publisher.id) continue;
    if (publisher.type !== "inactive") continue;
    if (publisher.archived_at) continue;

    const local = local_map.get(publisher.id);
    if (!local?.confidential_id) continue;

    const active_month_keys =
      active_months_by_confidential.get(local.confidential_id) ?? new Set<string>();
    if (active_month_keys.size === 0) continue;

    const active_months = previous_months.filter((m) => active_month_keys.has(m.key));

    entries.push({
      publisher_id: publisher.id,
      full_name: getPublisherDisplayName(publisher),
      active_months,
    });
  }

  entries.sort(sortByName);

  return { entries, isLoading };
}
