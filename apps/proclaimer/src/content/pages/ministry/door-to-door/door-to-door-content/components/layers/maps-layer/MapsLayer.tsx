import type { Expression } from "mapbox-gl";
import { Source, Layer } from "react-map-gl/mapbox";
import { useMapsBoundary } from "./hooks/useMapsBoundary";
import { useTheme } from "@amodeo/proclaimer/util/theme";
import {
  MAP_OVERLAY_MIN_ZOOM,
  MAP_POLYGON_COLOR,
  MAP_SELECTED_COLOR,
  MAP_VERTEX_MIN_ZOOM,
  mapTextHaloColor,
} from "../mapLayerConstants";
import { useBeforeId } from "../hooks/useBeforeId";
import { useMapStyle } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapStyleContext";

export function MapsLayer() {
  const geojson = useMapsBoundary();
  const { resolved_theme } = useTheme();
  const { styleId } = useMapStyle();
  const haloColor = mapTextHaloColor(styleId, resolved_theme);
  const beforeId = useBeforeId("road-label");
  const isSelected: Expression = ["==", ["get", "is_selected"], true];

  return (
    <Source id="maps" type="geojson" data={geojson}>
      <Layer
        id="maps-line"
        type="line"
        minzoom={MAP_OVERLAY_MIN_ZOOM}
        filter={["!", isSelected]}
        beforeId={beforeId}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-color": MAP_POLYGON_COLOR,
          "line-width": 2,
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MAP_OVERLAY_MIN_ZOOM,
            0,
            MAP_VERTEX_MIN_ZOOM,
            0.7,
          ],
          "line-dasharray": [0.5, 3],
        }}
      />
      <Layer
        id="maps-line-selected"
        type="line"
        minzoom={MAP_OVERLAY_MIN_ZOOM}
        filter={isSelected}
        beforeId={beforeId}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-color": MAP_SELECTED_COLOR,
          "line-width": ["interpolate", ["linear"], ["zoom"], MAP_OVERLAY_MIN_ZOOM, 0, 24, 18],
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MAP_OVERLAY_MIN_ZOOM,
            0.7,
            MAP_VERTEX_MIN_ZOOM,
            0.9,
          ],
        }}
      />
      <Layer
        id="maps-labels"
        type="symbol"
        minzoom={MAP_OVERLAY_MIN_ZOOM}
        filter={["==", ["geometry-type"], "Point"]}
        layout={{
          "text-field": ["get", "name"],
          "text-size": ["interpolate", ["linear"], ["zoom"], MAP_OVERLAY_MIN_ZOOM, 0, 21, 75],
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-anchor": "center",
          "symbol-placement": "point",
        }}
        paint={{
          "text-color": ["case", isSelected, MAP_SELECTED_COLOR, MAP_POLYGON_COLOR],
          "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            11,
            0,
            16,
            ["case", isSelected, 1, 0.6],
          ],
          "text-halo-color": haloColor,
          "text-halo-width": 1,
        }}
      />
    </Source>
  );
}
