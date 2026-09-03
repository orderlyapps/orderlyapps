import { getServiceYear } from "../../pdf/utils/service-year.ts";
import type { Report } from "../../../schemas/report.ts";

export type ReportEntry = {
  date: string;
  active: boolean | null;
  aux_pio: boolean | null;
  hours: number | null;
  bible_studies: number | null;
  credit_hours: Partial<Record<"ldc" | "bethel" | "hlc" | "school", number>> | null;
  comments: string | null;
  confidential_id: string;
};

const MONTH_COUNT = 24;

export function usePublisherRecordData(reports: Report[], is_pioneer: boolean) {
  const publisher_reports = [...reports].sort((a, b) => b.date.localeCompare(a.date));

  const now = new Date();
  const all_months: string[] = [];
  for (let i = 0; i < MONTH_COUNT; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    all_months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }

  const report_map = new Map<string, ReportEntry>();
  for (const r of publisher_reports) {
    report_map.set(r.date.slice(0, 7), r as unknown as ReportEntry);
  }

  const merged: ReportEntry[] = all_months.map((ym) => {
    const r = report_map.get(ym);
    if (r) return r;
    return {
      date: `${ym}-01`,
      active: null,
      aux_pio: null,
      hours: null,
      bible_studies: null,
      credit_hours: null,
      comments: null,
      confidential_id: "",
    };
  });

  const getYearKey = (dateStr: string) =>
    is_pioneer ? getServiceYear(new Date(dateStr + "T00:00:00")) : dateStr.slice(0, 4);

  const years = [...new Set(merged.map((r) => getYearKey(r.date)))].sort((a, b) =>
    b.localeCompare(a),
  );

  return { merged, years, getYearKey };
}
