import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";
import { useSelectedMap } from "./useSelectedMapContext";

export function useSelectedMapName(): string | null {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const { selectedMapId } = useSelectedMap();

  if (!selectedMapId) return null;

  const map = ((data ?? []) as MapRow[]).find(
    (row) => row.id === selectedMapId && row.congregation_id === congregation_id,
  );

  return map?.name ?? null;
}
