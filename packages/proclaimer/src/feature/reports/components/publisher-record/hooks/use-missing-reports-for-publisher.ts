import type { Report } from "../../../schemas/report.ts";
import {
  getPreviousMonths,
  type MonthKey,
} from "../../missing-reports-list/utils/get-previous-months.ts";

const ALMOST_INACTIVE_THRESHOLD = 5;
const ALMOST_INACTIVE_MAX = 6;
const MAX_CHECK_MONTHS = 6;

export function useMissingReportsForPublisher(reports: Report[]) {
  const active_months = new Set<string>();
  for (const r of reports) {
    if (!r.active) continue;
    active_months.add(r.date.slice(0, 7));
  }

  const previous = getPreviousMonths(MAX_CHECK_MONTHS);

  const missing_months: MonthKey[] = [];
  for (const m of previous) {
    if (active_months.has(m.key)) break;
    missing_months.push(m);
  }

  const consecutive_missing_count = missing_months.length;
  const is_almost_inactive =
    consecutive_missing_count >= ALMOST_INACTIVE_THRESHOLD &&
    consecutive_missing_count <= ALMOST_INACTIVE_MAX;

  return { missing_months, consecutive_missing_count, is_almost_inactive };
}
