import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapListItemProps {
  map: MapWithBoundary;
  onMapSelect: (map: MapWithBoundary) => void;
  onPreviewImage: (url: string) => void;
}

export function MapListItem({ map, onMapSelect, onPreviewImage }: MapListItemProps) {
  return (
    <LabelValueItem
      key={map.id}
      label={map.name}
      value={map.details ?? undefined}
      on_click={() => onMapSelect(map)}
      end_detail={
        map.url ? (
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={(e) => {
                e.stopPropagation();
                onPreviewImage(map.url!);
              }}
            >
              <IonIcon slot="icon-only" icon={imageOutline} size="large" />
            </IonButton>
          </IonButtons>
        ) : undefined
      }
    />
  );
}
