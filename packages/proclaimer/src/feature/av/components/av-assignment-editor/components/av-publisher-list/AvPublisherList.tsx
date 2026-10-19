import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import type { AvPublisherStats } from "../../../../utils/compute-av-stats.ts";
import type { AvParticipationType } from "../../../../utils/av-participation-type-labels.ts";
import { sortAvPublishers } from "../../../../utils/sort-av-publishers.ts";
import { getAvStatLabel } from "../../../../utils/get-av-stat-label.ts";
import { AvPublisherListItem } from "../av-publisher-list-item/AvPublisherListItem.tsx";

interface AvPublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
  stats: Map<string, AvPublisherStats>;
  participation_type: AvParticipationType;
  participation_types: Map<string, Set<AvParticipationType>>;
  publisher_ids_with_week_assignment?: Set<string>;
}

export function AvPublisherList({
  publishers,
  selected_id,
  on_select,
  stats,
  participation_type,
  participation_types,
  publisher_ids_with_week_assignment,
}: AvPublisherListProps) {
  const filtered_publishers = publishers.filter((p) => {
    if (p.archived_at) return false;

    const is_participant = p.id
      ? (participation_types.get(p.id)?.has(participation_type) ?? false)
      : false;
    if (!is_participant) return false;

    return true;
  });

  if (filtered_publishers.length === 0) {
    return (
      <IonList className="ion-margin" inset>
        <IonItem>
          <IonLabel color="medium">No publishers found.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const sorted = sortAvPublishers(filtered_publishers, stats);

  return (
    <>
      <IonList className="ion-margin" inset>
        <IonItem>
          <IonLabel>{filtered_publishers.length} publishers</IonLabel>
          <IonNote slot="end">{publishers.length} total</IonNote>
        </IonItem>
      </IonList>
      <MultiColumnList<Publisher>
        items={sorted}
        get_id={(item) => item.id ?? ""}
        render_item={(item) => (
          <AvPublisherListItem
            publisher={item}
            selected={selected_id === item.id}
            stat_label={getAvStatLabel(item.id, stats)}
            on_select={() => on_select(item.id ?? "")}
            has_week_assignment={publisher_ids_with_week_assignment?.has(item.id ?? "") ?? false}
          />
        )}
      />
      <Space size="2xl" />
    </>
  );
}
