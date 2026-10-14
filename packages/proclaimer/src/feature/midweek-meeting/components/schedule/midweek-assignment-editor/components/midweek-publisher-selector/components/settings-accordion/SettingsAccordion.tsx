import { useState } from "react";
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { AlertMultiSelect } from "@amodeo/proclaimer/ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";
import type { ParticipationType } from "../../utils/participation-type-map.ts";
import type {
  GenderFilter,
  PublisherSelectorSettings,
} from "../../hooks/use-selector-settings/use-selector-settings.ts";
import { usesGenderFilter } from "../../hooks/use-selector-settings/use-selector-settings.ts";
import { AddMidweekMeetingParticipantModal } from "../../../../../../participation/add-midweek-meeting-participant-modal/AddMidweekMeetingParticipantModal.tsx";
import { midweekMeetingParticipationTypeLabels } from "../../../../../../../utils/midweek-meeting-participation-type-labels.ts";

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
  const [add_modal_open, set_add_modal_open] = useState(false);

  return (
    <>
      <IonAccordionGroup value={value} onIonChange={onIonChange}>
        <IonAccordion value="settings">
          <IonItem slot="header">
            <IonLabel>
              <Heading>List Settings</Heading>
            </IonLabel>
          </IonItem>
          <div slot="content" className="ion-padding-bottom">
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
            <IonList className="ion-margin" inset>
              <IonItem button detail={false} onClick={() => set_add_modal_open(true)}>
                <IonIcon icon={addOutline} slot="start" color="primary" />
                <IonLabel color="primary">Add Participant</IonLabel>
              </IonItem>
            </IonList>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
      <AddMidweekMeetingParticipantModal
        participation_id={participation_type}
        modal_title={`${midweekMeetingParticipationTypeLabels[participation_type]} Participant`}
        is_open={add_modal_open}
        on_dismiss={() => set_add_modal_open(false)}
      />
    </>
  );
}
