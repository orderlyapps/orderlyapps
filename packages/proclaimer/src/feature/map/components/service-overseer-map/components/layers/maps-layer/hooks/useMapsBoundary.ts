import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useMapLogSettings } from "../../../../../map-log/map-log-content/components/use-map-log-settings/useMapLogSettings.ts";
import { useFilteredMapLogMaps } from "../../../../../map-log/map-log-content/components/use-filtered-map-log-maps/useFilteredMapLogMaps.ts";
import { SO_MAP_LIST_SETTINGS_VARIANT } from "../../../../utils/types.ts";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";
import { isValidBoundary } from "../../../../utils/boundary.ts";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { id: string | null; name: string; details: string | null };
};

export type MapsGeoJSON = {
  type: "FeatureCollection";
  features: PolygonFeature[];
};

function toGeoJSONPolygon(boundary: number[][]): { type: "Polygon"; coordinates: number[][][] } {
  return { type: "Polygon", coordinates: [boundary] };
}

export function useMapsBoundary(): MapsGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const { settings } = useMapLogSettings(
    localStorageKeyWithVariant("mapLogListSettings", SO_MAP_LIST_SETTINGS_VARIANT),
  );

  const congregation_maps = ((data ?? []) as MapRow[]).filter(
    (row): row is MapRow & { boundary: number[][] } =>
      row.congregation_id === congregation_id && isValidBoundary(row.boundary),
  );

  const { maps: filtered_maps } = useFilteredMapLogMaps(
    congregation_maps,
    {
      checkout_filter: settings.checkout_filter,
      untagged_only: false,
      tag_ids: settings.tag_ids,
      min_weeks_since_activity: null,
      min_weeks_since_checkin: settings.min_weeks_since_checkin,
    },
    settings.sort_order,
  );

  const features = filtered_maps.map((row) => ({
    type: "Feature" as const,
    geometry: toGeoJSONPolygon(row.boundary),
    properties: {
      id: row.id ?? null,
      name: row.name,
      details: row.details ?? null,
    },
  }));

  return { type: "FeatureCollection", features };
}
