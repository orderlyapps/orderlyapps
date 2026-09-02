export interface MonthKey {
  /** Calendar month key in `YYYY-MM` format, matching `Report.date.slice(0, 7)`. */
  key: string;
  /** Human-readable label, e.g. "August 2026". */
  label: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Returns the previous `count` calendar months relative to `today`, ordered
 * from the most recent previous month to the oldest. E.g. for today
 * 2026-09-03 and `count` 3 -> [2026-08, 2026-07, 2026-06].
 */
export function getPreviousMonths(count: number, today: Date = new Date()): MonthKey[] {
  const months: MonthKey[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months.push({ key, label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` });
  }
  return months;
}
