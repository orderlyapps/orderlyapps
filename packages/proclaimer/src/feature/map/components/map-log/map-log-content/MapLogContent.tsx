import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { MapLogSettingsAccordion } from "./components/map-log-settings-accordion/MapLogSettingsAccordion.tsx";
import { useMapLogSettings } from "./components/use-map-log-settings/useMapLogSettings.ts";
import { useFilteredMapLogMaps } from "./components/use-filtered-map-log-maps/useFilteredMapLogMaps.ts";
import { formatWeeksSince } from "@amodeo/proclaimer/util/date/formatWeeksSince";

interface MapLogContentProps {
  search_term?: string;
}

export function MapLogContent({ search_term = "" }: MapLogContentProps) {
  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);

  const { settings, setSettings } = useMapLogSettings();
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
    },
    settings.sort_order,
  );

  const search_filtered_maps = search_term.trim()
    ? filtered_maps.filter((map) => {
        const q = search_term.toLowerCase();
        const publisher_name = last_checkout_publisher_by_map_id.get(map.id ?? "") ?? "";
        return (
          map.name.toLowerCase().includes(q) ||
          (map.details ?? "").toLowerCase().includes(q) ||
          publisher_name.toLowerCase().includes(q)
        );
      })
    : filtered_maps;

  function weeksSinceStatusDate(map_id: string | undefined): string | undefined {
    if (!map_id) return undefined;
    const status_date = status_date_by_map_id.get(map_id);
    return status_date ? formatWeeksSince(status_date) : undefined;
  }

  return (
    <>
      <MapLogSettingsAccordion settings={settings} on_change={setSettings} />
      <IonItem className="ion-text-center" lines="none">
        <IonLabel>
          <Body size="sm" color="medium" style={{ padding: "0 16px 4px" }}>
            Showing {search_filtered_maps.length} of {congregation_maps.length}
          </Body>
        </IonLabel>
      </IonItem>
      <IonList>
        {search_filtered_maps.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>{congregation_maps.length === 0 ? "No maps yet." : "No maps match filters."}</p>
            </IonLabel>
          </IonItem>
        )}
        {search_filtered_maps.map((map) => {
          const is_checked_out = checked_out_map_ids.has(map.id ?? "");
          const publisher_name = last_checkout_publisher_by_map_id.get(map.id ?? "") ?? "";
          const weeks_since_status =
            settings.sort_order === "checked_out" || settings.checkout_filter !== "any"
              ? weeksSinceStatusDate(map.id)
              : undefined;
          return (
            <LabelValueItem
              key={map.id}
              label={map.name}
              label_color={is_checked_out ? "success" : undefined}
              value={map.details ?? undefined}
              value_2={publisher_name || undefined}
              value_2_color={is_checked_out ? undefined : "medium"}
              router_link={`/home/service-overseer/map-log/${map.id}`}
              detail
              end_detail={
                weeks_since_status ? <Body size="sm">{weeks_since_status}</Body> : undefined
              }
            />
          );
        })}
      </IonList>
    </>
  );
}
