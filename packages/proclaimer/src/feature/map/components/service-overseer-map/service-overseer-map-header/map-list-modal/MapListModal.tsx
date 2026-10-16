import { useState } from "react";
import { IonModal } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@amodeo/proclaimer/feature/territory";
import { mapMasterCollection } from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useMapLogSettings } from "../../../map-log/map-log-content/components/use-map-log-settings/useMapLogSettings.ts";
import { useFilteredMapLogMaps } from "../../../map-log/map-log-content/components/use-filtered-map-log-maps/useFilteredMapLogMaps.ts";
import { MapListModalHeader } from "./components/map-list-modal-header/MapListModalHeader.tsx";
import { MapListModalContent } from "./components/map-list-modal-content/MapListModalContent.tsx";
import { MapListModalAlerts } from "./components/map-list-modal-alerts/MapListModalAlerts.tsx";
import { boundaryToBounds } from "../../utils/boundary.ts";
import { getRecentMapIds, recordRecentMap } from "../../utils/useRecentMaps.ts";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";
import type { MapMaster } from "@amodeo/proclaimer/feature/territory";
import { SO_MAP_LIST_SETTINGS_VARIANT } from "../../utils/types.ts";
import type { SelectedMap } from "../../utils/types.ts";

type MapListModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (selection: SelectedMap) => void;
  onImportKml: (geojson: GeoJSON.FeatureCollection) => void;
};

export function MapListModal({ isOpen, onDidDismiss, onSelect, onImportKml }: MapListModalProps) {
  const [show_add_alert, set_show_add_alert] = useState(false);
  const [show_add_action_sheet, set_show_add_action_sheet] = useState(false);
  const [show_error_alert, set_show_error_alert] = useState(false);
  const [search_query, set_search_query] = useState("");
  const { settings, setSettings } = useMapLogSettings(
    localStorageKeyWithVariant("mapLogListSettings", SO_MAP_LIST_SETTINGS_VARIANT),
  );

  const { data: maps } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: masters } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const congregation_maps = maps?.filter((map) => map.congregation_id === congregation_id) ?? [];
  const {
    maps: filtered_maps,
    status_date_by_map_id,
    checked_out_map_ids,
    last_checkout_publisher_by_map_id,
  } = useFilteredMapLogMaps(
    congregation_maps,
    {
      checkout_filter: settings.checkout_filter,
      untagged_only: false,
      tag_ids: settings.tag_ids,
      min_weeks_since_activity: null,
      min_weeks_since_checkin: settings.min_weeks_since_checkin,
    },
    settings.sort_order,
  );

  const search_filtered_maps = search_query.trim()
    ? filtered_maps.filter((map) => {
        const q = search_query.toLowerCase();
        const publisher_name = last_checkout_publisher_by_map_id.get(map.id ?? "") ?? "";
        return (
          map.name.toLowerCase().includes(q) ||
          (map.details ?? "").toLowerCase().includes(q) ||
          publisher_name.toLowerCase().includes(q)
        );
      })
    : filtered_maps;
  const recent_ids = getRecentMapIds();
  const recent_maps = recent_ids
    .map((id) => congregation_maps.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m != null);
  const filtered_masters = masters?.filter((master) => master.congregation_id === congregation_id);
  const master = filtered_masters?.[0];

  function handleSelectMap(map: MapRow) {
    if (!map.id) return;
    recordRecentMap(map.id);
    onSelect({
      type: "map",
      id: map.id,
      name: map.name,
      details: map.details,
      url: map.url,
      boundary: map.boundary,
      bounds: boundaryToBounds(map.boundary) ?? undefined,
      blocks: map.blocks,
    });
    onDidDismiss();
  }

  function handleSelectMaster(master: MapMaster) {
    onSelect({
      type: "master",
      congregation_id: master.congregation_id,
      boundary: master.boundary,
      bounds: boundaryToBounds(master.boundary) ?? undefined,
    });
    onDidDismiss();
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <MapListModalHeader
        search_query={search_query}
        on_search_change={set_search_query}
        on_close={onDidDismiss}
        on_add={() => set_show_add_action_sheet(true)}
      />
      <MapListModalContent
        search_query={search_query}
        recent_maps={recent_maps}
        congregation_maps={congregation_maps}
        search_filtered_maps={search_filtered_maps}
        settings={settings}
        on_settings_change={setSettings}
        master={master}
        checked_out_map_ids={checked_out_map_ids}
        status_date_by_map_id={status_date_by_map_id}
        last_checkout_publisher_by_map_id={last_checkout_publisher_by_map_id}
        on_select_map={handleSelectMap}
        on_select_master={handleSelectMaster}
      />
      <MapListModalAlerts
        show_add_alert={show_add_alert}
        set_show_add_alert={set_show_add_alert}
        show_add_action_sheet={show_add_action_sheet}
        set_show_add_action_sheet={set_show_add_action_sheet}
        show_error_alert={show_error_alert}
        set_show_error_alert={set_show_error_alert}
        congregation_id={congregation_id}
        on_select={onSelect}
        on_did_dismiss={onDidDismiss}
        on_import_kml={onImportKml}
      />
    </IonModal>
  );
}
