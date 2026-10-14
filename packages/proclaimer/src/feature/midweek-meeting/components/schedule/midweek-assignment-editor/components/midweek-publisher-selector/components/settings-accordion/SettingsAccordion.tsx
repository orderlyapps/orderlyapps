import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { AlertMultiSelect } from "@amodeo/proclaimer/ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";
import type { ParticipationType } from "../../utils/participation-type-map.ts";
import type {
  GenderFilter,
  ParticipantGroup,
  PublisherSelectorSettings,
} from "../../hooks/use-selector-settings/use-selector-settings.ts";
import { usesGenderFilter } from "../../hooks/use-selector-settings/use-selector-settings.ts";

const participantOptions: { label: string; value: ParticipantGroup }[] = [
  { label: "Participants", value: "participants" },
  { label: "Non-Participants", value: "non_participants" },
];

const genderOptions: { label: string; value: GenderFilter }[] = [
  { label: "Both", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const participationTypeOptions: { label: string; value: ParticipationType }[] = [
  { label: "Prayer", value: "prayer" },
  { label: "Treasures", value: "treasures" },
  { label: "Gems", value: "gems" },
  { label: "Bible Reading", value: "bible_reading" },
  { label: "Apply", value: "apply" },
  { label: "Assistant", value: "assistant" },
  { label: "Chairman", value: "chairman" },
  { label: "Counselor", value: "counselor" },
  { label: "Living", value: "living" },
  { label: "CBS Conductor", value: "cbs_conductor" },
  { label: "CBS Reader", value: "cbs_reader" },
];

interface SettingsAccordionProps {
  participation_type: ParticipationType;
  settings: PublisherSelectorSettings;
  on_change: (settings: PublisherSelectorSettings) => void;
}

export function SettingsAccordion({
  participation_type,
  settings,
  on_change,
}: SettingsAccordionProps) {
  const { value, onIonChange } = useAccordionState(
    localStorageKeyWithVariant("midweekSelectorAccordion", participation_type),
    undefined,
  );

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="settings">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Sort &amp; Filters</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content" className="ion-padding-bottom">
          <AlertMultiSelect
            label="Show"
            options={participantOptions}
            selected={settings.participant_groups}
            on_change={(participant_groups) => on_change({ ...settings, participant_groups })}
          />
          {usesGenderFilter(participation_type) && (
            <Select
              label="Gender"
              value={settings.gender}
              options={genderOptions}
              on_change={(value) => on_change({ ...settings, gender: value as GenderFilter })}
            />
          )}
          <AlertMultiSelect
            label="Weeks Away Calculated From"
            options={participationTypeOptions}
            selected={settings.stat_participation_types}
            on_change={(stat_participation_types) =>
              on_change({ ...settings, stat_participation_types })
            }
          />
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
