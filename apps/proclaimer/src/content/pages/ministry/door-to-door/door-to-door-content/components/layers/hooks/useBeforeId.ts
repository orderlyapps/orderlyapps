import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";

// Some selectable base styles (e.g. satellite) have no "road-label" layer, and
// mapbox silently skips adding a layer whose beforeId is missing. Track the
// target layer across style swaps so callers only pass beforeId when it exists.
export function useBeforeId(layerId: string): string | undefined {
  const { current: map } = useMap();
  const [exists, setExists] = useState(() => map?.getLayer(layerId) !== undefined);

  useEffect(() => {
    if (!map) return;
    const check = () => setExists(map.getLayer(layerId) !== undefined);
    check();
    map.on("styledata", check);
    return () => {
      map.off("styledata", check);
    };
  }, [map, layerId]);

  return exists ? layerId : undefined;
}
