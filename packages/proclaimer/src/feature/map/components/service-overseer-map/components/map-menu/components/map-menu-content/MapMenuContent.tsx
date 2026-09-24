import { IonContent } from "@ionic/react";
import { MapStyleSelect } from "@amodeo/proclaimer/ui/vendor/mapbox/MapStyleSelect";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import type { SelectableStyleId } from "@amodeo/proclaimer/ui/vendor/mapbox/mapbox-styles";
import type { CustomLocalStyleSettings } from "@amodeo/proclaimer/ui/vendor/mapbox/custom-local-style-settings";
import type { Block, SelectedMap } from "../../../../utils/types.ts";
import type { ScreenshotSettings } from "../../../../utils/screenshotSettings.ts";
import { ScreenshotSettingsSection } from "./components/screenshot-settings-section/ScreenshotSettingsSection.tsx";
import { MapDetailsSection } from "./components/map-details-section/MapDetailsSection.tsx";
import { MapActionsSection } from "./components/map-actions-section/MapActionsSection.tsx";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";

type Props = {
  styleId: SelectableStyleId;
  onStyleIdChange: (styleId: SelectableStyleId) => void;
  screenshotMode: boolean;
  is_map: boolean;
  customLocalStyleSettings: CustomLocalStyleSettings;
  onCustomLocalStyleSettingsChange: (settings: CustomLocalStyleSettings) => void;
  screenshotSettings: ScreenshotSettings;
  onScreenshotSettingsChange: (settings: ScreenshotSettings) => void;
  selectedMap: SelectedMap | null;
  onUpdateMap: (name: string, details: string, url: string) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
  onEditBoundary: () => void;
  onDeleteMap: () => void;
  blocks: Block[] | null;
  onRenameBlock: (blockId: string, name: string) => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
};

export function MapMenuContent({
  styleId,
  onStyleIdChange,
  screenshotMode,
  is_map,
  customLocalStyleSettings,
  onCustomLocalStyleSettingsChange,
  screenshotSettings,
  onScreenshotSettingsChange,
  selectedMap,
  onUpdateMap,
  hasPendingChanges,
  onSave,
  onEditBoundary,
  onDeleteMap,
  blocks,
  onRenameBlock,
  onEditBlock,
  onDeleteBlock,
}: Props) {
  return (
    <IonContent className="content-wide">
      {hasPendingChanges && (
        <>
          <TextButton label="Save Changes" disabled={!hasPendingChanges} on_click={onSave} />
          <Space />
        </>
      )}

      <MapStyleSelect value={styleId} on_change={onStyleIdChange} />

      {screenshotMode && is_map && (
        <ScreenshotSettingsSection
          styleId={styleId}
          customLocalStyleSettings={customLocalStyleSettings}
          onCustomLocalStyleSettingsChange={onCustomLocalStyleSettingsChange}
          screenshotSettings={screenshotSettings}
          onScreenshotSettingsChange={onScreenshotSettingsChange}
        />
      )}

      {!screenshotMode && is_map && selectedMap?.type === "map" && (
        <MapDetailsSection selectedMap={selectedMap} onUpdateMap={onUpdateMap} />
      )}

      {!screenshotMode && (
        <MapActionsSection
          is_map={is_map}
          hasPendingChanges={hasPendingChanges}
          onEditBoundary={onEditBoundary}
          onDeleteMap={onDeleteMap}
          blocks={blocks}
          onRenameBlock={onRenameBlock}
          onEditBlock={onEditBlock}
          onDeleteBlock={onDeleteBlock}
        />
      )}

      <Space />
    </IonContent>
  );
}
