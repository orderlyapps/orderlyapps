import type { AvPublisherStats } from "./compute-av-stats.ts";

export function getAvStatLabel(
  publisher_id: string | undefined,
  stats: Map<string, AvPublisherStats>,
): string | undefined {
  if (!publisher_id) return undefined;
  const weeks_away = stats.get(publisher_id)?.weeks_away_closest;
  return weeks_away != null ? `${weeks_away}w` : undefined;
}
