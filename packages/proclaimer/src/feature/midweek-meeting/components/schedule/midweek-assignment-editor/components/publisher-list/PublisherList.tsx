import { useState } from "react";
import { IonIcon, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import type { PublisherStats } from "../midweek-publisher-selector/hooks/use-publisher-stats/use-publisher-stats.ts";
import type {
  GenderFilter,
  ParticipantGroup,
} from "../midweek-publisher-selector/hooks/use-selector-settings/use-selector-settings.ts";
import type { ParticipationType } from "../midweek-publisher-selector/utils/participation-type-map.ts";
import { sortPublishers } from "./utils/sort-publishers.ts";
import { getStatLabel } from "./utils/get-stat-label.ts";
import { PublisherListItem } from "./components/publisher-list-item/PublisherListItem.tsx";
import { AddMidweekMeetingParticipantModal } from "../../../../participation/add-midweek-meeting-participant-modal/AddMidweekMeetingParticipantModal.tsx";
import { midweekMeetingParticipationTypeLabels } from "../../../../../utils/midweek-meeting-participation-type-labels.ts";

interface PublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
  stats: Map<string, PublisherStats>;
  participant_groups: ParticipantGroup[];
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
  participant_groups,
  gender,
  participation_type,
  participation_types,
  publisher_ids_with_week_assignment,
}: PublisherListProps) {
  const [add_modal_open, set_add_modal_open] = useState(false);

  const add_participant = (
    <>
      <IonList className="ion-margin" inset>
        <IonItem button detail={false} onClick={() => set_add_modal_open(true)}>
          <IonIcon icon={addOutline} slot="start" color="primary" />
          <IonLabel color="primary">Add Participant</IonLabel>
        </IonItem>
      </IonList>
      <AddMidweekMeetingParticipantModal
        participation_id={participation_type}
        modal_title={`${midweekMeetingParticipationTypeLabels[participation_type]} Participant`}
        is_open={add_modal_open}
        on_dismiss={() => set_add_modal_open(false)}
      />
    </>
  );

  const filtered_publishers = publishers.filter((p) => {
    if (p.archived_at) return false;

    const is_participant = p.id
      ? (participation_types.get(p.id)?.has(participation_type) ?? false)
      : false;
    const group: ParticipantGroup = is_participant ? "participants" : "non_participants";
    if (!participant_groups.includes(group)) return false;

    if (gender && gender !== "all" && p.gender !== gender) return false;

    return true;
  });

  if (filtered_publishers.length === 0) {
    return (
      <>
        <IonList className="ion-margin" inset>
          <IonItem>
            <IonLabel color="medium">No publishers found.</IonLabel>
          </IonItem>
        </IonList>
        {add_participant}
      </>
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
      {add_participant}
      <Space size="2xl" />
    </>
  );
}
