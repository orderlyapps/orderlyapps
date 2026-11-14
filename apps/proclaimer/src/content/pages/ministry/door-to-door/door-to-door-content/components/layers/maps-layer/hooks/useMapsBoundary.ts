import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";
import { boundaryToPolygonCoords, boundaryToLabelPoint } from "@amodeo/proclaimer/feature/map";
import { useMapDisplayMode } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapDisplayModeContext";
import { useSelectedMap } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useSelectedMapContext";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { id: string | null; name: string; details: string | null; is_selected: boolean };
};

type LabelFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: number[] };
  properties: PolygonFeature["properties"];
};

export type MapsGeoJSON = {
  type: "FeatureCollection";
  features: (PolygonFeature | LabelFeature)[];
};

export function useMapsBoundary(): MapsGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const { displayMode } = useMapDisplayMode();
  const { selectedMapId } = useSelectedMap();

  const features = ((data ?? []) as MapRow[])
    .filter((row) => row.congregation_id === congregation_id)
    .filter((row) => {
      // If display mode is "selected", only show the selected map
      if (displayMode === "selected") {
        return selectedMapId ? row.id === selectedMapId : false;
      }
      // Otherwise show all maps
      return true;
    })
    .flatMap((row) => {
      const coordinates = boundaryToPolygonCoords(row.boundary);
      if (!coordinates) return [];
      const properties = {
        id: row.id ?? null,
        name: row.name,
        details: row.details ?? null,
        is_selected: row.id === selectedMapId,
      };
      const result: MapsGeoJSON["features"] = [
        {
          type: "Feature",
          geometry: { type: "Polygon", coordinates },
          properties,
        },
      ];
      // Labels anchor to a single point per map so a polygon split across
      // tiles cannot render the same name more than once.
      const labelPoint = boundaryToLabelPoint(row.boundary);
      if (labelPoint) {
        result.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: labelPoint },
          properties: { ...properties },
        });
      }
      return result;
    });

  return { type: "FeatureCollection", features };
}
