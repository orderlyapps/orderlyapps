import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "../../../../../database/collections/publisher.ts";
import { publisherLocalCollection } from "../../../../../database/collections/publisher-local.ts";
import { groupCollection } from "../../../../../database/collections/group.ts";
import { reportCollection } from "../../../collections/report.ts";
import type { Report } from "../../../schemas/report.ts";
import type { Publisher } from "../../../../../database/schemas/publisher.ts";
import type { Group } from "../../../../../database/schemas/group.ts";
import type { PublisherRecordData, PublisherReportEntry } from "../../all-reports-pdf/types.ts";
import { getPublisherDisplayName } from "../../../utils/publisher-name.ts";
import { buildServiceYearReportsForYears, reportsToMap } from "../../../utils/service-year.ts";

interface LocalPublisherData {
  publisher_id: string;
  confidential_id: string;
  birth_date?: string;
  baptism_date?: string;
}

const INCLUDED_TYPES = new Set([
  "inactive",
  "regular_pioneer",
  "special_pioneer",
  "publisher",
  "continuous_auxiliary",
]);

const PIONEER_TYPES = new Set(["regular_pioneer", "special_pioneer"]);

function buildPublisherRecord(
  publisher: Publisher,
  local: LocalPublisherData | undefined,
): PublisherRecordData {
  return {
    full_name: getPublisherDisplayName(publisher),
    first_name: publisher.first_name,
    middle_name: publisher.middle_name ?? null,
    last_name: publisher.last_name,
    display_name: publisher.display_name ?? null,
    gender: publisher.gender,
    type: publisher.type,
    standing: publisher.standing,
    birth_date: local?.birth_date ?? "",
    baptism_date: local?.baptism_date ?? "",
    other_sheep: true,
    anointed: false,
  };
}

function sortByGroupThenName(a: PublisherReportEntry, b: PublisherReportEntry): number {
  const groupCmp = a.group_label.localeCompare(b.group_label);
  if (groupCmp !== 0) return groupCmp;
  return (
    a.publisher.last_name.localeCompare(b.publisher.last_name) ||
    a.publisher.first_name.localeCompare(b.publisher.first_name)
  );
}

export function useAllReportsData() {
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }), []);
  const { data: local_data } = useLiveQuery((q) => q.from({ pl: publisherLocalCollection }), []);
  const { data: reports } = useLiveQuery((q) => q.from({ r: reportCollection }), []);
  const { data: groups } = useLiveQuery((q) => q.from({ g: groupCollection }), []);

  function buildEntries(service_years: string[]): PublisherReportEntry[] {
    const all_publishers = (publishers ?? []) as Publisher[];
    const all_local = (local_data ?? []) as LocalPublisherData[];
    const all_reports = (reports ?? []) as Report[];
    const all_groups = (groups ?? []) as Group[];

    const local_map = new Map<string, LocalPublisherData>();
    for (const l of all_local) {
      local_map.set(l.publisher_id, l);
    }

    const reports_by_confidential = new Map<string, Report[]>();
    for (const r of all_reports) {
      const arr = reports_by_confidential.get(r.confidential_id);
      if (arr) arr.push(r);
      else reports_by_confidential.set(r.confidential_id, [r]);
    }

    const group_map = new Map<string, Group>();
    for (const g of all_groups) {
      if (g.id) group_map.set(g.id, g);
    }

    const entries: PublisherReportEntry[] = [];

    for (const publisher of all_publishers) {
      if (!publisher.id) continue;
      if (!INCLUDED_TYPES.has(publisher.type)) continue;
      if (publisher.archived_at) continue;

      const local = local_map.get(publisher.id);
      const confidential_id = local?.confidential_id;
      if (!confidential_id) continue;

      const publisher_reports = reports_by_confidential.get(confidential_id) ?? [];
      const report_map = reportsToMap(publisher_reports);
      const sy_reports = buildServiceYearReportsForYears(report_map, publisher.type, service_years);

      const publisher_record = buildPublisherRecord(publisher, local);

      let group_label: string;
      if (publisher.type === "inactive") {
        group_label = "Inactive";
      } else if (PIONEER_TYPES.has(publisher.type)) {
        group_label = "Pioneers";
      } else {
        const group = publisher.group_id ? group_map.get(publisher.group_id) : undefined;
        group_label = group?.name ?? "Ungrouped";
      }

      entries.push({
        publisher: publisher_record,
        reports: sy_reports,
        group_label,
      });
    }

    entries.sort(sortByGroupThenName);
    return entries;
  }

  return { buildEntries };
}
