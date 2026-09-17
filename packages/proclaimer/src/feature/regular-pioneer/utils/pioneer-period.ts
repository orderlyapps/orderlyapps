import type { RegularPioneer } from "../schemas/regular-pioneer.ts";

type PeriodRange = Pick<RegularPioneer, "start_month" | "end_month">;

const FAR_FUTURE = "9999-12-01";

export function firstOfMonth(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

export function currentFirstOfMonth(): string {
  const now = new Date();
  return firstOfMonth(now.getFullYear(), now.getMonth() + 1);
}

export function formatMonth(month: string): string {
  return new Date(`${month}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

export function isActivePeriod(period: PeriodRange): boolean {
  const current = currentFirstOfMonth();
  return period.start_month <= current && (period.end_month ?? FAR_FUTURE) >= current;
}

export function formatPioneerPeriod(period: PeriodRange): string {
  const start = formatMonth(period.start_month);
  return period.end_month ? `${start} – ${formatMonth(period.end_month)}` : `${start} – Present`;
}

export function wouldOverlap(periods: PeriodRange[], candidate: PeriodRange): boolean {
  const candidate_end = candidate.end_month ?? FAR_FUTURE;
  return periods.some(
    (p) => p.start_month <= candidate_end && (p.end_month ?? FAR_FUTURE) >= candidate.start_month,
  );
}
