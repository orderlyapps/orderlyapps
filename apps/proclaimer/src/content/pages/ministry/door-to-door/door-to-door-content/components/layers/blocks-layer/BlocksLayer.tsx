import { Source, Layer } from "react-map-gl/mapbox";
import { useSelectedMapBlocks } from "./hooks/useSelectedMapBlocks";
import { useTheme } from "@amodeo/proclaimer/util/theme";
import { JW_BLUE } from "@amodeo/proclaimer/ui/colors/jwColors";
import { MAP_VERTEX_MIN_ZOOM, mapTextHaloColor } from "../mapLayerConstants";
import { useBeforeId } from "../hooks/useBeforeId";
import { useMapStyle } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapStyleContext";

export function BlocksLayer() {
  const { polygons, lines, lineEndpoints } = useSelectedMapBlocks();
  const { resolved_theme } = useTheme();
  const { styleId } = useMapStyle();
  const haloColor = mapTextHaloColor(styleId, resolved_theme);
  const beforeId = useBeforeId("road-label");
  const hasPolygons = polygons.features.length > 0;
  const hasLines = lines.features.length > 0;
  const hasEndpoints = lineEndpoints.features.length > 0;

  if (!hasPolygons && !hasLines && !hasEndpoints) return null;

  const blue = JW_BLUE[resolved_theme].base;

  return (
    <>
      {hasPolygons && (
        <Source id="selected-map-blocks-polygons" type="geojson" data={polygons}>
          <Layer
            id="selected-map-blocks-polygons-line"
            type="line"
            minzoom={MAP_VERTEX_MIN_ZOOM}
            beforeId={beforeId}
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{
              "line-color": blue,
              "line-width": 2,
              "line-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                MAP_VERTEX_MIN_ZOOM,
                0,
                19,
                0.7,
              ],
              "line-dasharray": [0.5, 3],
            }}
          />
          <Layer
            id="selected-map-blocks-polygons-label"
            type="symbol"
            minzoom={MAP_VERTEX_MIN_ZOOM}
            filter={["==", ["geometry-type"], "Point"]}
            layout={{
              "text-field": ["get", "name"],
              "text-size": ["interpolate", ["linear"], ["zoom"], MAP_VERTEX_MIN_ZOOM, 0, 21, 75],
              "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
              "text-anchor": "center",
              "symbol-placement": "point",
            }}
            paint={{
              "text-color": blue,
              "text-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                MAP_VERTEX_MIN_ZOOM - 1,
                0,
                MAP_VERTEX_MIN_ZOOM + 4,
                1,
              ],
              "text-halo-color": haloColor,
              "text-halo-width": 1,
            }}
          />
        </Source>
      )}
      {hasLines && (
        <Source id="selected-map-blocks-lines" type="geojson" data={lines}>
          <Layer
            id="selected-map-blocks-lines-line"
            type="line"
            minzoom={MAP_VERTEX_MIN_ZOOM}
            beforeId={beforeId}
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{
              "line-color": blue,
              "line-width": 2,
              "line-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                MAP_VERTEX_MIN_ZOOM,
                0,
                19,
                0.7,
              ],
              "line-dasharray": [0.5, 3],
            }}
          />
        </Source>
      )}
      {hasEndpoints && (
        <Source id="selected-map-blocks-line-endpoints" type="geojson" data={lineEndpoints}>
          <Layer
            id="selected-map-blocks-line-endpoints-label"
            type="symbol"
            minzoom={MAP_VERTEX_MIN_ZOOM}
            layout={{
              "text-field": ["get", "name"],
              "text-size": ["interpolate", ["linear"], ["zoom"], MAP_VERTEX_MIN_ZOOM, 0, 21, 75],
              "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
              "text-anchor": "center",
              "symbol-placement": "point",
            }}
            paint={{
              "text-color": blue,
              "text-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                MAP_VERTEX_MIN_ZOOM - 1,
                0,
                MAP_VERTEX_MIN_ZOOM + 4,
                1,
              ],
              "text-halo-color": haloColor,
              "text-halo-width": 1,
            }}
          />
        </Source>
      )}
    </>
  );
}
