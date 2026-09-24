import { lazy, Suspense } from "react";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import type { CustomLocalStyleSettings } from "./custom-local-style-settings.ts";
import type { SelectableStyleId } from "./mapbox-styles.ts";
import type { ViewState } from "react-map-gl/mapbox";
import type { LngLat, GeoJSONFeature } from "mapbox-gl";

const LazyMapViewInner = lazy(() => import("./map-view/MapViewInner.tsx"));

type Props = {
  id?: string;
  initialViewState?: Partial<ViewState>;
  initialStyleId?: SelectableStyleId;
  styleId?: SelectableStyleId;
  height?: string | number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  customLocalStyleSettings?: CustomLocalStyleSettings;
  on_press?: (lngLat: LngLat, features: GeoJSONFeature[]) => void;
  on_long_press?: (lngLat: LngLat, features: GeoJSONFeature[]) => void;
};

export function MapView({ fallback = <Spinner />, ...props }: Props) {
  return (
    <Suspense fallback={fallback}>
      <LazyMapViewInner {...props} />
    </Suspense>
  );
}
