import { useEffect, useState } from "react";
import { Source, Layer } from "react-map-gl/mapbox";
import { useNotAtHomeMarkers } from "./hooks/useNotAtHomeMarkers";
import {
  buildNotAtHomeFeatures,
  type NotAtHomeFeature,
} from "./helpers/build-not-at-home-features";
import { getHousePointLayer } from "./house-layers/point";
import { getHouseLabelLayer } from "./house-layers/label";
import { getUnitPointLayer } from "./unit-layers/point";
import { getUnitLabelLayer } from "./unit-layers/label";
import { getClusterPointLayer } from "./cluster-layers/point";
import { getClusterLabelLayer } from "./cluster-layers/label";
import { NotAtHomeClickHandler } from "./components/not-at-home-click-handler/NotAtHomeClickHandler";
import { useNotAtHomeStaleDays } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useNotAtHomeStaleDaysContext";
import type { NotAtHome } from "./types";

export const SOURCE_ID = "not-at-home";

type NotAtHomeSourceProps = {
  onSelect: (notAtHome: NotAtHome) => void;
  onSelectUnits: (groupKey: string) => void;
};

const STALE_REFRESH_MS = 60 * 1000;

export function NotAtHomeSource({ onSelect, onSelectUnits }: NotAtHomeSourceProps) {
  const groupedByAddress = useNotAtHomeMarkers();
  const { staleDays } = useNotAtHomeStaleDays();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), STALE_REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  if (!groupedByAddress) return null;

  const features = buildNotAtHomeFeatures(groupedByAddress, staleDays, now);
  const geojson = {
    type: "FeatureCollection" as const,
    features: features as NotAtHomeFeature[],
  };

  return (
    <Source
      id={SOURCE_ID}
      type="geojson"
      data={geojson as GeoJSON.FeatureCollection}
      cluster
      clusterMaxZoom={13}
      clusterRadius={50}
      clusterProperties={{
        return_count: ["+", ["get", "return_count"], 0],
        write_count: ["+", ["get", "write_count"], 0],
      }}
    >
      <Layer {...getUnitPointLayer()} />
      <Layer {...getUnitLabelLayer()} />
      <Layer {...getHousePointLayer()} />
      <Layer {...getHouseLabelLayer()} />
      <Layer {...getClusterPointLayer()} />
      <Layer {...getClusterLabelLayer()} />
      <NotAtHomeClickHandler onSelect={onSelect} onSelectUnits={onSelectUnits} />
    </Source>
  );
}
