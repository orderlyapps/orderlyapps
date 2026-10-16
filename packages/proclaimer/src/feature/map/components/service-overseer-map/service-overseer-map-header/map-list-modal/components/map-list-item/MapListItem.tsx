import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { timeOutline } from "ionicons/icons";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { formatWeeksSince } from "@amodeo/proclaimer/util/date/formatWeeksSince";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";

type MapListItemProps = {
  map: MapRow;
  is_checked_out: boolean;
  publisher_name?: string;
  last_activity?: string;
  on_select: (map: MapRow) => void;
  on_show_log: (map_id: string) => void;
};

export function MapListItem({
  map,
  is_checked_out,
  publisher_name,
  last_activity,
  on_select,
  on_show_log,
}: MapListItemProps) {
  const weeks_since_activity = last_activity ? formatWeeksSince(last_activity) : undefined;
  return (
    <LabelValueItem
      label={map.name}
      label_color={is_checked_out ? "success" : undefined}
      value={map.details ?? undefined}
      value_2={publisher_name || undefined}
      value_2_color={is_checked_out ? undefined : "medium"}
      on_click={() => on_select(map)}
      end_detail={
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {weeks_since_activity && <Body size="sm">{weeks_since_activity}</Body>}
          {map.id && (
            <IonButtons>
              <IonButton
                fill="clear"
                onClick={(e) => {
                  e.stopPropagation();
                  on_show_log(map.id!);
                }}
              >
                <IonIcon slot="icon-only" icon={timeOutline} size="large" />
              </IonButton>
            </IonButtons>
          )}
        </div>
      }
    />
  );
}
