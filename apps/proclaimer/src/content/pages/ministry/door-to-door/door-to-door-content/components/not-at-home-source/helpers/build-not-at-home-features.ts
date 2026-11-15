import type { NotAtHome } from "../types";
import type { NotAtHomeVisibility } from "@proclaimer-content/pages/ministry/door-to-door/shared/notAtHomeVisibility";

type NotAtHomeWithCoordinates = NotAtHome & { coordinates: [number, number] };

export type NotAtHomeFeature = {
  type: "Feature";
  id: string;
  properties: NotAtHomeWithCoordinates & {
    group_key: string;
    unit_count: number;
    unit_data: NotAtHomeWithCoordinates[];
    write_count: number;
    return_count: number;
    stale: boolean;
  };
  geometry: { type: "Point"; coordinates: [number, number] };
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function buildNotAtHomeFeatures(
  groupedByAddress: Record<string, NotAtHomeWithCoordinates[]>,
  staleDays = 0,
  now = Date.now(),
  visibility: NotAtHomeVisibility = "all",
): NotAtHomeFeature[] {
  const staleThresholdMs = staleDays > 0 ? staleDays * DAY_MS : null;

  function isStale(item: NotAtHomeWithCoordinates): boolean {
    if (item.write || staleThresholdMs === null) return false;
    const createdAt = new Date(item.created_at).getTime();
    return Number.isFinite(createdAt) && now - createdAt >= staleThresholdMs;
  }

  return Object.entries(groupedByAddress)
    .map(([group_key, group]): NotAtHomeFeature => {
      const firstItem = group[0];
      const write_count = group.filter((item) => item.write).length;
      const return_count = group.filter((item) => !item.write).length;
      const stale_count = group.filter(isStale).length;

      return {
        type: "Feature",
        id: firstItem.id,
        properties: {
          ...firstItem,
          group_key,
          unit_count: group.length,
          unit_data: group,
          write_count,
          return_count,
          stale: return_count > 0 && stale_count === return_count,
        },
        geometry: {
          type: "Point",
          coordinates: firstItem.coordinates,
        },
      };
    })
    .filter(({ properties }) => {
      if (visibility === "hide_old") return !properties.stale;
      if (visibility === "hide_new") {
        return properties.stale || properties.return_count === 0;
      }
      return true;
    });
}
