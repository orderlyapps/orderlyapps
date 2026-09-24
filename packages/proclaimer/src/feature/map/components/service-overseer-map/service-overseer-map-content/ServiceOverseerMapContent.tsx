import { useState } from "react";
import { IonAlert, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapView } from "@amodeo/proclaimer/ui/vendor/mapbox/MapView";
import { MapPolygonEditor } from "../components/map-polygon-editor/MapPolygonEditor.tsx";
import { MapBlockEditor } from "../components/map-block-editor/MapBlockEditor.tsx";
import type { Block, SelectedMap } from "../utils/types.ts";
import { MapsLayer } from "../components/layers/maps-layer/MapsLayer.tsx";
import { MapMasterLayer } from "../components/layers/map-master-layer/MapMasterLayer.tsx";
import { MapBlocksLayer } from "../components/layers/map-blocks-layer/MapBlocksLayer.tsx";
import { KmlLayer } from "../components/layers/kml-layer/KmlLayer.tsx";
import { ScreenshotMapLayer } from "../components/layers/screenshot-map-layer/ScreenshotMapLayer.tsx";
import { ScreenshotOverlay } from "../components/screenshot-overlay/ScreenshotOverlay.tsx";
import {
  MapFitBoundsController,
  type FitBoundsFn,
} from "../components/map-fit-bounds-controller/MapFitBoundsController.tsx";
import { doNotCallCollection } from "@amodeo/proclaimer/feature/territory";
import { DoNotCallSource } from "../../do-not-call-source/DoNotCallSource.tsx";
import { DoNotCallAlert } from "../../do-not-call-source/components/do-not-call-alert/DoNotCallAlert.tsx";
import { DoNotCallEditLocationMarker } from "../../do-not-call-source/components/do-not-call-location-editor/DoNotCallEditLocationMarker.tsx";
import { DoNotCallEditLocationFabs } from "../../do-not-call-source/components/do-not-call-location-editor/DoNotCallEditLocationFabs.tsx";
import { useDoNotCallLocationEditor } from "../../do-not-call-source/hooks/useDoNotCallLocationEditor.ts";
import type { DoNotCall } from "../../do-not-call-source/types.ts";
import { DoNotCallModal } from "../components/do-not-call-modal/DoNotCallModal.tsx";
import { DoNotCallUnitModal } from "../components/do-not-call-unit-modal/DoNotCallUnitModal.tsx";
import type { ScreenshotSettings } from "../utils/screenshotSettings.ts";
import type { CustomLocalStyleSettings } from "@amodeo/proclaimer/ui/vendor/mapbox/custom-local-style-settings";
import type { SelectableStyleId } from "@amodeo/proclaimer/ui/vendor/mapbox/mapbox-styles";
import type { LngLat, GeoJSONFeature } from "mapbox-gl";

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
  selectedMap: SelectedMap | null;
  selectedBlock: Block | null;
  screenshotMode: boolean;
  screenshotSettings: ScreenshotSettings;
  onPendingChange: (boundary: GeoJSON.Position[] | null) => void;
  onBlockPendingChange: (block: Block | null) => void;
  styleId: SelectableStyleId;
  customLocalStyleSettings: CustomLocalStyleSettings;
  kmlGeoJson: GeoJSON.FeatureCollection | null;
  onCreateMapFromBoundary: (name: string, boundary: number[][]) => void;
};

export function ServiceOverseerMapContent({
  fitBoundsRef,
  selectedMap,
  selectedBlock,
  screenshotMode,
  screenshotSettings,
  onPendingChange,
  onBlockPendingChange,
  styleId,
  customLocalStyleSettings,
  kmlGeoJson,
  onCreateMapFromBoundary,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoNotCall, setSelectedDoNotCall] = useState<DoNotCall | null>(null);
  const [selectedDoNotCallGroupKey, setSelectedDoNotCallGroupKey] = useState<string | null>(null);
  const [kmlPolygonBoundary, setKmlPolygonBoundary] = useState<number[][] | null>(null);
  const [showKmlAlert, setShowKmlAlert] = useState(false);
  const {
    isEditing,
    editingCoordinates,
    startEditing,
    updateCoordinates,
    saveEditing,
    cancelEditing,
  } = useDoNotCallLocationEditor();

  function handleMapPress(_lngLat: LngLat, features: GeoJSONFeature[]) {
    if (!kmlGeoJson || selectedMap) return;
    const hasDoNotCall = features.some(
      (f) =>
        f.layer?.id === "do-not-call-house-points" || f.layer?.id === "do-not-call-unit-points",
    );
    if (hasDoNotCall) return;
    const kmlPolygon = features.find(
      (f) => f.source === "kml-import" && f.geometry.type === "Polygon",
    );
    if (!kmlPolygon) return;
    const coordinates = (kmlPolygon.geometry as GeoJSON.Polygon).coordinates[0];
    if (!coordinates || coordinates.length < 4) return;
    setKmlPolygonBoundary(coordinates as number[][]);
    setShowKmlAlert(true);
  }

  return (
    <>
      <MapView
        id="service-overseer-map"
        style={{ position: "absolute", inset: 0 }}
        height="100%"
        styleId={styleId}
        customLocalStyleSettings={customLocalStyleSettings}
        on_press={handleMapPress}
      >
        <MapFitBoundsController fitBoundsRef={fitBoundsRef} />
        {screenshotMode && selectedMap ? (
          <>
            <ScreenshotMapLayer selectedMap={selectedMap} settings={screenshotSettings} />
            {selectedMap.type === "map" && (
              <ScreenshotOverlay
                name={selectedMap.name}
                details={selectedMap.details}
                fontSize={screenshotSettings.overlay_font_size}
              />
            )}
          </>
        ) : (
          <>
            <MapMasterLayer />
            <MapsLayer />
            {kmlGeoJson && <KmlLayer geojson={kmlGeoJson} />}
            <DoNotCallSource
              onSelect={setSelectedDoNotCall}
              onSelectGroup={setSelectedDoNotCallGroupKey}
            />
            {editingCoordinates && (
              <DoNotCallEditLocationMarker
                coordinates={editingCoordinates}
                onChange={updateCoordinates}
              />
            )}
            {selectedMap && <MapBlocksLayer selectedMap={selectedMap} />}
            {selectedBlock && (
              <MapBlockEditor block={selectedBlock} onPendingChange={onBlockPendingChange} />
            )}
            {selectedMap && !selectedBlock && (
              <MapPolygonEditor
                key={selectedMap.type === "map" ? selectedMap.id : selectedMap.congregation_id}
                selection={selectedMap}
                onPendingChange={onPendingChange}
              />
            )}
          </>
        )}
      </MapView>

      {!screenshotMode && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      )}

      {isEditing && <DoNotCallEditLocationFabs onSave={saveEditing} onCancel={cancelEditing} />}

      <DoNotCallModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        onSave={(coordinates) => {
          setIsModalOpen(false);
          const [lng, lat] = coordinates;
          fitBoundsRef.current?.([
            [lng - 0.001, lat - 0.001],
            [lng + 0.001, lat + 0.001],
          ]);
        }}
      />

      <DoNotCallAlert
        selected={selectedDoNotCall}
        onDismiss={() => setSelectedDoNotCall(null)}
        onDelete={(id) => doNotCallCollection.delete(id)}
        onEditLocation={() => {
          if (selectedDoNotCall) {
            startEditing(selectedDoNotCall);
            setSelectedDoNotCall(null);
          }
        }}
      />

      <DoNotCallUnitModal
        groupKey={selectedDoNotCallGroupKey}
        onDismiss={() => setSelectedDoNotCallGroupKey(null)}
      />

      <IonAlert
        isOpen={showKmlAlert}
        header="Create Map from KML"
        inputs={[{ name: "name", type: "text", placeholder: "Map name" }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Create",
            handler: (data: { name: string }) => {
              const name = data.name.trim();
              if (!name || !kmlPolygonBoundary) return;
              onCreateMapFromBoundary(name, kmlPolygonBoundary);
            },
          },
        ]}
        onDidDismiss={() => {
          setShowKmlAlert(false);
          setKmlPolygonBoundary(null);
        }}
      />
    </>
  );
}
