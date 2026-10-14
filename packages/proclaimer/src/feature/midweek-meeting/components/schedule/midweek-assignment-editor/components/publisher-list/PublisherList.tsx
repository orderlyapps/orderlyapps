import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import type { PublisherStats } from "../midweek-publisher-selector/hooks/use-publisher-stats/use-publisher-stats.ts";
import type { GenderFilter } from "../midweek-publisher-selector/hooks/use-selector-settings/use-selector-settings.ts";
import type { ParticipationType } from "../midweek-publisher-selector/utils/participation-type-map.ts";
import { sortPublishers } from "./utils/sort-publishers.ts";
import { getStatLabel } from "./utils/get-stat-label.ts";
import { PublisherListItem } from "./components/publisher-list-item/PublisherListItem.tsx";

interface PublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
  stats: Map<string, PublisherStats>;
  gender: GenderFilter | null;
  participation_type: ParticipationType;
  participation_types: Map<string, Set<ParticipationType>>;
  publisher_ids_with_week_assignment?: Set<string>;
}

export function PublisherList({
  publishers,
  selected_id,
  on_select,
  stats,
  gender,
  participation_type,
  participation_types,
  publisher_ids_with_week_assignment,
}: PublisherListProps) {
  const filtered_publishers = publishers.filter((p) => {
    if (p.archived_at) return false;

    const is_participant = p.id
      ? (participation_types.get(p.id)?.has(participation_type) ?? false)
      : false;
    if (!is_participant) return false;

    if (gender && gender !== "all" && p.gender !== gender) return false;

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

  const sorted = sortPublishers(filtered_publishers, stats);

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
          <PublisherListItem
            publisher={item}
            selected={selected_id === item.id}
            stat_label={getStatLabel(item.id, stats)}
            on_select={() => on_select(item.id ?? "")}
            has_week_assignment={publisher_ids_with_week_assignment?.has(item.id ?? "") ?? false}
          />
        )}
      />
      <Space size="2xl" />
    </>
  );
}
