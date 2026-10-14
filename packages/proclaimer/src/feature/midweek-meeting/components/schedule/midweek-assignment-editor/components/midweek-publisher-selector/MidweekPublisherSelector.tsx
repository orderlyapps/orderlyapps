import { useLiveQuery } from "@tanstack/react-db";
import { PublisherList } from "../publisher-list/PublisherList.tsx";
import { PublisherSelectModal } from "../publisher-list/components/publisher-select-modal/PublisherSelectModal.tsx";
import { PublisherSegment } from "./components/publisher-segment/PublisherSegment.tsx";
import { SettingsAccordion } from "./components/settings-accordion/SettingsAccordion.tsx";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import type {
  MidweekMeetingAssignment,
  MidweekMeetingAssignmentId,
} from "../../../../../schemas/midweek-meeting-assignment.ts";
import { midweekMeetingAssignmentCollection } from "../../../../../collections/midweek-meeting-assignment.ts";
import { participationTypeMap } from "./utils/participation-type-map.ts";
import { useSelectorSettings } from "./hooks/use-selector-settings/use-selector-settings.ts";
import { usesGenderFilter } from "./hooks/use-selector-settings/use-selector-settings.ts";
import { usePublisherStats } from "./hooks/use-publisher-stats/use-publisher-stats.ts";
import { usePublisherParticipationTypes } from "./hooks/use-publisher-participation-types/use-publisher-participation-types.ts";
import { usePublisherSelection } from "./hooks/use-publisher-selection/use-publisher-selection.ts";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";

interface PublisherSelectorProps {
  publishers: Publisher[];
  assignment: MidweekMeetingAssignment | undefined;
  assistantId: string | undefined;
  assistantAssignment: MidweekMeetingAssignment | undefined;
  onSelectAssignee: (publisher_id: string) => void;
  onSelectAssistant: (publisher_id: string) => void;
  assignment_id: string;
  week_id: string;
}

export function MidweekPublisherSelector({
  publishers,
  assignment,
  assistantId,
  assistantAssignment,
  onSelectAssignee,
  onSelectAssistant,
  assignment_id,
  week_id,
}: PublisherSelectorProps) {
  const congregation_id = getStoredCongregation()?.id;

  const participation_type =
    participationTypeMap[assignment_id as MidweekMeetingAssignmentId] ?? "prayer";
  const assistant_participation_type = assistantId
    ? (participationTypeMap[assistantId as MidweekMeetingAssignmentId] ?? "assistant")
    : null;

  const assignee_settings_api = useSelectorSettings(participation_type);
  const assistant_settings_api = useSelectorSettings(assistant_participation_type);

  const assignee_stats = usePublisherStats(
    participation_type,
    week_id,
    congregation_id,
    assignee_settings_api.settings.stat_participation_types,
  );
  const assistant_stats = usePublisherStats(
    assistant_participation_type,
    week_id,
    congregation_id,
    assistant_settings_api.settings.stat_participation_types,
  );
  const participation_types = usePublisherParticipationTypes(congregation_id);

  const { is_modal_open, selected_publisher, handleSelectPublisher, handleConfirm, handleDismiss } =
    usePublisherSelection({ publishers, onSelectAssignee, onSelectAssistant });

  const { data: allAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekMeetingAssignmentCollection }),
  );
  const publisher_ids_with_week_assignment = new Set(
    ((allAssignments as MidweekMeetingAssignment[] | undefined) ?? [])
      .filter((a) => a.week_id === week_id)
      .map((a) => a.participant_id),
  );

  if (!assistantId) {
    return (
      <>
        <SettingsAccordion
          participation_type={participation_type}
          settings={assignee_settings_api.settings}
          on_change={assignee_settings_api.setSettings}
        />
        <PublisherList
          publishers={publishers}
          selected_id={assignment?.participant_id}
          on_select={(id) => handleSelectPublisher(id, "assignee")}
          stats={assignee_stats}
          participant_groups={assignee_settings_api.settings.participant_groups}
          gender={
            usesGenderFilter(participation_type) ? assignee_settings_api.settings.gender : null
          }
          participation_type={participation_type}
          participation_types={participation_types}
          publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
        />
        <PublisherSelectModal
          is_open={is_modal_open}
          publisher={selected_publisher}
          on_dismiss={handleDismiss}
          on_confirm={handleConfirm}
          week_id={week_id}
          all_assignments={(allAssignments as MidweekMeetingAssignment[] | undefined) ?? []}
          publishers={publishers}
        />
      </>
    );
  }

  return (
    <>
      <PublisherSegment
        publishers={publishers}
        assignment={assignment}
        assistantAssignment={assistantAssignment}
        assistant_label={assistantId === "cbs_reader" ? "Reader" : "Assistant"}
        participation_type={participation_type}
        assistant_participation_type={assistant_participation_type ?? "assistant"}
        assignee_settings={assignee_settings_api.settings}
        assistant_settings={assistant_settings_api.settings}
        assignee_stats={assignee_stats}
        assistant_stats={assistant_stats}
        participation_types={participation_types}
        onChangeAssignee={assignee_settings_api.setSettings}
        onChangeAssistant={assistant_settings_api.setSettings}
        onSelectAssignee={(id) => handleSelectPublisher(id, "assignee")}
        onSelectAssistant={(id) => handleSelectPublisher(id, "assistant")}
        publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
      />
      <PublisherSelectModal
        is_open={is_modal_open}
        publisher={selected_publisher}
        on_dismiss={handleDismiss}
        on_confirm={handleConfirm}
        week_id={week_id}
        all_assignments={(allAssignments as MidweekMeetingAssignment[] | undefined) ?? []}
        publishers={publishers}
      />
    </>
  );
}
