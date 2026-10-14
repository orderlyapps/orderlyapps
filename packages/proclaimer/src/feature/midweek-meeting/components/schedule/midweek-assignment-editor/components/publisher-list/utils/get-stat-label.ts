import type { PublisherStats } from "../../midweek-publisher-selector/hooks/use-publisher-stats/use-publisher-stats.ts";

export function getStatLabel(
  publisher_id: string | undefined,
  stats: Map<string, PublisherStats>,
): string | undefined {
  if (!publisher_id) return undefined;
  const weeks_away = stats.get(publisher_id)?.weeks_away_closest;
  return weeks_away != null ? `${weeks_away}w` : undefined;
}
