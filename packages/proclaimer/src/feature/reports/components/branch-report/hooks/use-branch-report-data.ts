import { useLiveQuery } from "@tanstack/react-db";
import { addMonths } from "date-fns/addMonths";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { reportCollection } from "../../../collections/report.ts";
import type { Report } from "../../../schemas/report.ts";

/** Selected month plus the 5 months before it. */
const ACTIVE_WINDOW_MONTHS = 6;

export function useBranchReportData(month: string) {
  const { data: reports, isLoading } = useLiveQuery((q) => q.from({ r: reportCollection }), []);

  const month_keys = new Set<string>();
  const month_start = parseISO(`${month}-01T00:00:00`);
  for (let i = 0; i < ACTIVE_WINDOW_MONTHS; i++) {
    month_keys.add(format(addMonths(month_start, -i), "yyyy-MM"));
  }

  const active_confidential_ids = new Set<string>();
  for (const r of (reports ?? []) as Report[]) {
    if (!r.active || r.reported_elsewhere) continue;
    if (!month_keys.has(r.date.slice(0, 7))) continue;
    active_confidential_ids.add(r.confidential_id);
  }

  return {
    all_active_publishers: active_confidential_ids.size,
    isLoading,
  };
}
