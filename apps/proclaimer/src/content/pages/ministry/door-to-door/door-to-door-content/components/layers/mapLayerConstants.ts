import type { SelectableStyleId } from "@amodeo/proclaimer/ui/vendor/mapbox/mapbox-styles";

export const MAP_POLYGON_COLOR = "#9ca3af";
export const MAP_SELECTED_COLOR = "#ef4444";
export const MAP_VERTEX_MIN_ZOOM = 14;
export const MAP_OVERLAY_MIN_ZOOM = MAP_VERTEX_MIN_ZOOM - 2;

// The halo should match the basemap's brightness. Satellite styles are dark
// imagery regardless of theme; streets and outdoors stay light in both themes;
// the remaining styles follow resolved_theme via resolveMapStyle.
export function mapTextHaloColor(styleId: SelectableStyleId, theme: "light" | "dark"): string {
  const alwaysDark = styleId === "satellite-v9" || styleId === "satellite-streets-v12";
  const themeAware = styleId !== "streets-v12" && styleId !== "outdoors-v12";
  return alwaysDark || (themeAware && theme === "dark") ? "#1f2937" : "#dddddd";
}
