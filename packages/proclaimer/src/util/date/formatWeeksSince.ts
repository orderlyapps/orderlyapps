/**
 * Formats how long ago an ISO date/datetime string was, in coarse week units.
 * @returns e.g. "This week", "Last week", "3w", or "6mo"
 */
export function formatWeeksSince(iso_date: string): string {
  const weeks = Math.floor((Date.now() - new Date(iso_date).getTime()) / (1000 * 60 * 60 * 24 * 7));
  if (weeks <= 0) return "This week";
  if (weeks === 1) return "Last week";
  if (weeks > 26) return `${Math.floor(weeks / 4.345)}mo`;
  return `${weeks}w`;
}
