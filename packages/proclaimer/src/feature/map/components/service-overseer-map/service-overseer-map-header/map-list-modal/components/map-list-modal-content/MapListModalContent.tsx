import { useState } from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { MapLogSettingsAccordion } from "../../../../../map-log/map-log-content/components/map-log-settings-accordion/MapLogSettingsAccordion.tsx";
import { MapListItem } from "../map-list-item/MapListItem.tsx";
import { MapLogModal } from "./map-log-modal/MapLogModal.tsx";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";
import type { MapMaster } from "@amodeo/proclaimer/feature/territory";
import { SO_MAP_LIST_SETTINGS_VARIANT } from "../../../../utils/types.ts";
import type { MapLogListSettings } from "../../../../../map-log/map-log-content/components/use-map-log-settings/useMapLogSettings.ts";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";

type MapListModalContentProps = {
  search_query: string;
  recent_maps: MapRow[];
  congregation_maps: MapRow[];
  search_filtered_maps: MapRow[];
  settings: MapLogListSettings;
  on_settings_change: (settings: MapLogListSettings) => void;
  master?: MapMaster;
  checked_out_map_ids: Set<string>;
  status_date_by_map_id: Map<string, string>;
  last_checkout_publisher_by_map_id: Map<string, string>;
  on_select_map: (map: MapRow) => void;
  on_select_master: (master: MapMaster) => void;
};

export function MapListModalContent({
  search_query,
  recent_maps,
  congregation_maps,
  search_filtered_maps,
  settings,
  on_settings_change,
  master,
  checked_out_map_ids,
  status_date_by_map_id,
  last_checkout_publisher_by_map_id,
  on_select_map,
  on_select_master,
}: MapListModalContentProps) {
  const [log_map_id, set_log_map_id] = useState<string | null>(null);
  const { value, onIonChange } = useAccordionState(
    localStorageKeyWithVariant("recentMapsAccordion", SO_MAP_LIST_SETTINGS_VARIANT),
    "recent",
  );

  return (
    <IonContent className="content-wide">
      <MapLogSettingsAccordion
        settings={settings}
        on_change={on_settings_change}
        variant={SO_MAP_LIST_SETTINGS_VARIANT}
      />
      <IonList>
        {search_query.trim() === "" && recent_maps.length > 0 && (
          <IonAccordionGroup value={value} onIonChange={onIonChange}>
            <IonAccordion value="recent">
              <IonItem slot="header">
                <IonLabel>
                  <Heading>Recent Maps</Heading>
                </IonLabel>
              </IonItem>
              <div slot="content">
                <IonList>
                  {recent_maps.map((map) => (
                    <MapListItem
                      key={`recent-${map.id}`}
                      map={map}
                      is_checked_out={checked_out_map_ids.has(map.id ?? "")}
                      publisher_name={last_checkout_publisher_by_map_id.get(map.id ?? "")}
                      status_date={status_date_by_map_id.get(map.id ?? "")}
                      on_select={on_select_map}
                      on_show_log={set_log_map_id}
                    />
                  ))}
                </IonList>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        )}

        <Space></Space>

        <IonItem>
          <IonLabel>
            <Heading>Maps</Heading>
          </IonLabel>
          <div slot="end">
            <Body size="sm">
              {search_filtered_maps.length} of {congregation_maps.length}
            </Body>
          </div>
        </IonItem>

        {master && <LabelValueItem label="Master Map" on_click={() => on_select_master(master)} />}

        {search_filtered_maps.map((map) => (
          <MapListItem
            key={map.id ?? map.name}
            map={map}
            is_checked_out={checked_out_map_ids.has(map.id ?? "")}
            publisher_name={last_checkout_publisher_by_map_id.get(map.id ?? "")}
            status_date={status_date_by_map_id.get(map.id ?? "")}
            on_select={on_select_map}
            on_show_log={set_log_map_id}
          />
        ))}
      </IonList>

      {log_map_id && (
        <MapLogModal
          isOpen={log_map_id !== null}
          onDidDismiss={() => set_log_map_id(null)}
          map_id={log_map_id}
        />
      )}
    </IonContent>
  );
}
