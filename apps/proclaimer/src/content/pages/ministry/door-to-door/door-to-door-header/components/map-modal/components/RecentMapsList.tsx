import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { useMapsList } from "../hooks/useMapsList";
import { MapListItem } from "./map-list-item/MapListItem";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { localStorageKeys } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";

interface RecentMapsListProps {
  recentMapIds: string[];
  onMapSelect: (map: MapRow & { boundary: number[][] }) => void;
  onPreviewImage: (url: string) => void;
}

export function RecentMapsList({ recentMapIds, onMapSelect, onPreviewImage }: RecentMapsListProps) {
  const allMaps = useMapsList();

  // Filter maps to only include recent ones, maintaining the order from recentMapIds
  const recentMaps = recentMapIds
    .map((id) => allMaps.find((map) => map.id === id))
    .filter(Boolean) as (MapRow & { boundary: number[][] })[];
  const { value, onIonChange } = useAccordionState(
    localStorageKeys.recentMapsAccordion,
    "recent-maps",
  );

  if (recentMaps.length === 0) {
    return null;
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="recent-maps">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Recent Maps</Heading>
          </IonLabel>
        </IonItem>
        <IonList slot="content">
          {recentMaps.map((map) => (
            <MapListItem
              key={map.id}
              map={map}
              onMapSelect={onMapSelect}
              onPreviewImage={onPreviewImage}
            />
          ))}
        </IonList>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
