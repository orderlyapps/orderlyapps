type CreditedHoursEntry = {
  hours: number | null;
  credit_hours: Partial<Record<"ldc" | "bethel" | "hlc" | "school", number>> | null;
};

export function getCreditedHours(r: CreditedHoursEntry): number {
  if (r.hours == null) return 0;
  if (r.hours >= 55) return r.hours;
  const credit_total = Object.values(r.credit_hours ?? {}).reduce(
    (sum: number, h) => sum + (h ?? 0),
    0,
  );
  return Math.min(55, r.hours + credit_total);
}
