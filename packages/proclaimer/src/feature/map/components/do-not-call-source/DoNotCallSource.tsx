import { Source, Layer } from "react-map-gl/mapbox";
import { useDoNotCallMarkers } from "./hooks/useDoNotCallMarkers.ts";
import { getHousePointLayer } from "./house-layers/point.ts";
import { getHouseLabelLayer } from "./house-layers/label.ts";
import { getUnitPointLayer } from "./unit-layers/point.ts";
import { getUnitLabelLayer } from "./unit-layers/label.ts";
import { DoNotCallClickHandler } from "./components/do-not-call-click-handler/DoNotCallClickHandler.tsx";
import type { DoNotCall } from "./types.ts";

export const SOURCE_ID = "do-not-calls";

type DoNotCallWithCoordinates = DoNotCall & { coordinates: [number, number] };

type DoNotCallFeature = {
  type: "Feature";
  id?: string;
  properties: DoNotCallWithCoordinates & { unit_count: number; group_key: string };
  geometry: { type: "Point"; coordinates: [number, number] };
};

type DoNotCallSourceProps = {
  onSelect: (doNotCall: DoNotCall) => void;
  onSelectGroup?: (groupKey: string) => void;
};

export function DoNotCallSource({ onSelect, onSelectGroup }: DoNotCallSourceProps) {
  const groupedByAddress = useDoNotCallMarkers();
  if (!groupedByAddress) return null;

  const features: DoNotCallFeature[] = Object.entries(groupedByAddress).map(([groupKey, group]) => {
    const firstItem = group[0];
    return {
      type: "Feature",
      id: firstItem.id,
      properties: {
        ...firstItem,
        unit_count: group.length,
        group_key: groupKey,
      },
      geometry: {
        type: "Point",
        coordinates: firstItem.coordinates,
      },
    };
  });

  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features,
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getUnitPointLayer()} />
      <Layer {...getUnitLabelLayer()} />
      <Layer {...getHousePointLayer()} />
      <Layer {...getHouseLabelLayer()} />
      <DoNotCallClickHandler onSelect={onSelect} onSelectGroup={onSelectGroup} />
    </Source>
  );
}
