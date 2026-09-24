// Service overseer map page
export { ServiceOverseerMapHeader } from "./components/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader.tsx";
export { ServiceOverseerMapContent } from "./components/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent.tsx";
export { default as MapMenu } from "./components/service-overseer-map/components/map-menu/MapMenu.tsx";
export {
  MapFitBoundsController,
  type FitBoundsFn,
} from "./components/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController.tsx";
export { useMapPage } from "./components/service-overseer-map/utils/useMapPage.ts";
export {
  recordRecentMap,
  getRecentMapIds,
} from "./components/service-overseer-map/utils/useRecentMaps.ts";
export { kmlToGeoJSON } from "./components/service-overseer-map/utils/kml-to-geojson.ts";
export {
  isValidBoundary,
  isClosedRing,
  ensureClosedRing,
  boundaryToBounds,
  boundaryToPolygonCoords,
  blockCoordinatesToBounds,
  blockToPolygonCoords,
  blockToLineStringCoords,
} from "./components/service-overseer-map/utils/boundary.ts";
export {
  screenshotSettingsSchema,
  DEFAULT_SCREENSHOT_SETTINGS,
} from "./components/service-overseer-map/utils/screenshotSettings.ts";
export type { ScreenshotSettings } from "./components/service-overseer-map/utils/screenshotSettings.ts";
export type { Block, SelectedMap } from "./components/service-overseer-map/utils/types.ts";

// Do-not-call map source (shared with door-to-door page)
export { DoNotCallSource, SOURCE_ID } from "./components/do-not-call-source/DoNotCallSource.tsx";
export { DoNotCallAlert } from "./components/do-not-call-source/components/do-not-call-alert/DoNotCallAlert.tsx";
export { DoNotCallEditLocationMarker } from "./components/do-not-call-source/components/do-not-call-location-editor/DoNotCallEditLocationMarker.tsx";
export { DoNotCallEditLocationFabs } from "./components/do-not-call-source/components/do-not-call-location-editor/DoNotCallEditLocationFabs.tsx";
export { useDoNotCallLocationEditor } from "./components/do-not-call-source/hooks/useDoNotCallLocationEditor.ts";
export { useDoNotCallMarkers } from "./components/do-not-call-source/hooks/useDoNotCallMarkers.ts";
export type { DoNotCall } from "./components/do-not-call-source/types.ts";

// Territory selects (shared with door-to-door page)
export { SuburbSelect } from "./components/suburb-select/SuburbSelect.tsx";
export { StreetSelect } from "./components/street-select/StreetSelect.tsx";

// Map log pages
export { MapLogHeader } from "./components/map-log/map-log-header/MapLogHeader.tsx";
export { MapLogContent } from "./components/map-log/map-log-content/MapLogContent.tsx";
export { CheckoutModal } from "./components/map-log/map-log-content/components/checkout-modal/CheckoutModal.tsx";
export { MapLogDetailHeader } from "./components/map-log/map-log-detail/map-log-detail-header/MapLogDetailHeader.tsx";
export { MapLogDetailContent } from "./components/map-log/map-log-detail/map-log-detail-content/MapLogDetailContent.tsx";
export { BulkEntryHeader } from "./components/map-log/bulk-entry/bulk-entry-header/BulkEntryHeader.tsx";
export { BulkEntryContent } from "./components/map-log/bulk-entry/bulk-entry-content/BulkEntryContent.tsx";

// Map tags pages
export { MapTagsHeader } from "./components/map-tags/map-tags-header/MapTagsHeader.tsx";
export { MapTagsContent } from "./components/map-tags/map-tags-content/MapTagsContent.tsx";
export { MapTagDetailHeader } from "./components/map-tags/map-tag-detail/map-tag-detail-header/MapTagDetailHeader.tsx";
export { MapTagDetailContent } from "./components/map-tags/map-tag-detail/map-tag-detail-content/MapTagDetailContent.tsx";

// Map checkout pages
export { MapCheckoutHeader } from "./components/map-checkout/map-checkout-header/MapCheckoutHeader.tsx";
export { MapCheckoutContent } from "./components/map-checkout/map-checkout-content/MapCheckoutContent.tsx";
export { MapCheckoutDetailHeader } from "./components/map-checkout/map-checkout-detail/map-checkout-detail-header/MapCheckoutDetailHeader.tsx";
export { MapCheckoutDetailContent } from "./components/map-checkout/map-checkout-detail/map-checkout-detail-content/MapCheckoutDetailContent.tsx";
