import {
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonLabel,
  IonItemDivider,
} from "@ionic/react";
import { useState } from "react";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { MidweekMeetingAssignment } from "../../../../../../../schemas/midweek-meeting-assignment.ts";
import { PublisherList } from "../../../publisher-list/PublisherList.tsx";
import { SettingsAccordion } from "../settings-accordion/SettingsAccordion.tsx";
import type { PublisherStats } from "../../hooks/use-publisher-stats/use-publisher-stats.ts";
import type { PublisherSelectorSettings } from "../../hooks/use-selector-settings/use-selector-settings.ts";
import { usesGenderFilter } from "../../hooks/use-selector-settings/use-selector-settings.ts";
import type { ParticipationType } from "../../utils/participation-type-map.ts";

interface PublisherSegmentProps {
  publishers: Publisher[];
  assignment: MidweekMeetingAssignment | undefined;
  assistantAssignment: MidweekMeetingAssignment | undefined;
  assistant_label: string;
  participation_type: ParticipationType;
  assistant_participation_type: ParticipationType;
  assignee_settings: PublisherSelectorSettings;
  assistant_settings: PublisherSelectorSettings;
  assignee_stats: Map<string, PublisherStats>;
  assistant_stats: Map<string, PublisherStats>;
  participation_types: Map<string, Set<ParticipationType>>;
  onChangeAssignee: (settings: PublisherSelectorSettings) => void;
  onChangeAssistant: (settings: PublisherSelectorSettings) => void;
  onSelectAssignee: (id: string) => void;
  onSelectAssistant: (id: string) => void;
  publisher_ids_with_week_assignment?: Set<string>;
}

export function PublisherSegment({
  publishers,
  assignment,
  assistantAssignment,
  assistant_label,
  participation_type,
  assistant_participation_type,
  assignee_settings,
  assistant_settings,
  assignee_stats,
  assistant_stats,
  participation_types,
  onChangeAssignee,
  onChangeAssistant,
  onSelectAssignee,
  onSelectAssistant,
  publisher_ids_with_week_assignment,
}: PublisherSegmentProps) {
  const [segment, set_segment] = useState<"assignee" | "assistant">("assignee");

  return (
    <>
      <IonItemDivider sticky style={{ paddingBlock: "1rem" }}>
        <IonSegment
          value={segment}
          onIonChange={(e) => set_segment(e.detail.value as "assignee" | "assistant")}
        >
          <IonSegmentButton value="assignee" contentId="assignee">
            <IonLabel>Assignee</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="assistant" contentId="assistant">
            <IonLabel>{assistant_label}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonItemDivider>
      <IonSegmentView>
        <IonSegmentContent id="assignee">
          <SettingsAccordion
            participation_type={participation_type}
            settings={assignee_settings}
            on_change={onChangeAssignee}
          />
          <PublisherList
            publishers={publishers}
            selected_id={assignment?.participant_id}
            on_select={onSelectAssignee}
            stats={assignee_stats}
            participant_groups={assignee_settings.participant_groups}
            gender={usesGenderFilter(participation_type) ? assignee_settings.gender : null}
            participation_type={participation_type}
            participation_types={participation_types}
            publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
          />
        </IonSegmentContent>
        <IonSegmentContent id="assistant">
          <SettingsAccordion
            participation_type={assistant_participation_type}
            settings={assistant_settings}
            on_change={onChangeAssistant}
          />
          <PublisherList
            publishers={publishers}
            selected_id={assistantAssignment?.participant_id}
            on_select={onSelectAssistant}
            stats={assistant_stats}
            participant_groups={assistant_settings.participant_groups}
            gender={
              usesGenderFilter(assistant_participation_type) ? assistant_settings.gender : null
            }
            participation_type={assistant_participation_type}
            participation_types={participation_types}
            publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
          />
        </IonSegmentContent>
      </IonSegmentView>
    </>
  );
}
