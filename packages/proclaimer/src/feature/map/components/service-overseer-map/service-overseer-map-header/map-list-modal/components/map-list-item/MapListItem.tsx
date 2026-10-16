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
  status_date?: string;
  on_select: (map: MapRow) => void;
  on_show_log: (map_id: string) => void;
};

export function MapListItem({
  map,
  is_checked_out,
  publisher_name,
  status_date,
  on_select,
  on_show_log,
}: MapListItemProps) {
  const weeks_since = status_date ? formatWeeksSince(status_date) : undefined;
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
          {weeks_since && <Body size="sm">{weeks_since}</Body>}
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
