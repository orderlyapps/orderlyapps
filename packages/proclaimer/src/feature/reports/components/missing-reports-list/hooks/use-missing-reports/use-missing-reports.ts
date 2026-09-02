import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "../../../../../publisher/collections/publisher.ts";
import { publisherLocalCollection } from "../../../../../publisher-local/collections/publisher-local.ts";
import { groupCollection } from "../../../../../../database/collections/group.ts";
import { reportCollection } from "../../../../collections/report.ts";
import type { Report } from "../../../../schemas/report.ts";
import type { Publisher } from "../../../../../publisher/schemas/publisher.ts";
import type { Group } from "../../../../../../database/schemas/group.ts";
import { getPublisherDisplayName } from "../../../../../publisher/utils/publisher-name.ts";
import { getPreviousMonths, type MonthKey } from "../../utils/get-previous-months.ts";

interface LocalPublisherData {
  publisher_id: string;
  confidential_id: string;
}

/** Active publisher types that are expected to turn in a monthly report. */
const INCLUDED_TYPES = new Set([
  "publisher",
  "regular_pioneer",
  "special_pioneer",
  "continuous_auxiliary",
]);

const PIONEER_TYPES = new Set(["regular_pioneer", "special_pioneer"]);

export interface MissingReportsEntry {
  publisher_id: string;
  full_name: string;
  group_label: string;
}

function sortByGroupThenName(a: MissingReportsEntry, b: MissingReportsEntry): number {
  const groupCmp = a.group_label.localeCompare(b.group_label);
  if (groupCmp !== 0) return groupCmp;
  return a.full_name.localeCompare(b.full_name);
}

/**
 * Returns publishers who have not turned in a report for any of the previous
 * `months` calendar months. Inactive publishers are excluded since they are
 * not expected to report.
 */
export function useMissingReports(months: number) {
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
  const { data: groups, isLoading: groups_loading } = useLiveQuery(
    (q) => q.from({ g: groupCollection }),
    [],
  );

  const isLoading = publishers_loading || local_loading || reports_loading || groups_loading;

  const all_publishers = (publishers ?? []) as Publisher[];
  const all_local = (local_data ?? []) as LocalPublisherData[];
  const all_reports = (reports ?? []) as Report[];
  const all_groups = (groups ?? []) as Group[];

  const local_map = new Map<string, LocalPublisherData>();
  for (const l of all_local) local_map.set(l.publisher_id, l);

  const reported_months_by_confidential = new Map<string, Set<string>>();
  for (const r of all_reports) {
    const set = reported_months_by_confidential.get(r.confidential_id);
    if (set) set.add(r.date.slice(0, 7));
    else reported_months_by_confidential.set(r.confidential_id, new Set([r.date.slice(0, 7)]));
  }

  const group_map = new Map<string, Group>();
  for (const g of all_groups) if (g.id) group_map.set(g.id, g);

  const previous_months: MonthKey[] = getPreviousMonths(months);

  const entries: MissingReportsEntry[] = [];
  for (const publisher of all_publishers) {
    if (!publisher.id) continue;
    if (!INCLUDED_TYPES.has(publisher.type)) continue;
    if (publisher.archived_at) continue;

    const local = local_map.get(publisher.id);
    if (!local?.confidential_id) continue;

    const reported =
      reported_months_by_confidential.get(local.confidential_id) ?? new Set<string>();
    const has_any_previous = previous_months.some((m) => reported.has(m.key));
    if (has_any_previous) continue;

    let group_label: string;
    if (PIONEER_TYPES.has(publisher.type)) {
      group_label = "Pioneers";
    } else {
      const group = publisher.group_id ? group_map.get(publisher.group_id) : undefined;
      group_label = group?.name ?? "Ungrouped";
    }

    entries.push({
      publisher_id: publisher.id,
      full_name: getPublisherDisplayName(publisher),
      group_label,
    });
  }

  entries.sort(sortByGroupThenName);
  return { entries, previous_months, isLoading };
}
