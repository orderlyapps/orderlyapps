import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import type { PublisherStats } from "../../midweek-publisher-selector/hooks/use-publisher-stats/use-publisher-stats.ts";

export function sortPublishers(
  publishers: Publisher[],
  stats: Map<string, PublisherStats>,
): Publisher[] {
  return [...publishers].sort((a, b) => {
    const va = (a.id ? stats.get(a.id)?.weeks_away_closest : null) ?? -1;
    const vb = (b.id ? stats.get(b.id)?.weeks_away_closest : null) ?? -1;

    if (va === -1 && vb === -1)
      return getPublisherDisplayName(a).localeCompare(getPublisherDisplayName(b));
    if (va === -1) return -1;
    if (vb === -1) return 1;
    if (vb !== va) return vb - va;
    return getPublisherDisplayName(a).localeCompare(getPublisherDisplayName(b));
  });
}
