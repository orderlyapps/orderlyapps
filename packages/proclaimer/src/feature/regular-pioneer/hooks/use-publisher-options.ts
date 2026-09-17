import { useLiveQuery } from "@tanstack/react-db";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { publisherCollection, getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";

export function usePublisherOptions() {
  const congregation_id = getStoredCongregation()?.id;
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  return (publishers ?? [])
    .filter((p) => p.congregation_id === congregation_id && !p.archived_at)
    .sort((a, b) => a.last_name.localeCompare(b.last_name))
    .map((p) => ({ value: p.id ?? "", label: getPublisherDisplayName(p, "last_first") }));
}
