import { useState } from "react";
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { AlertMultiSelect } from "@amodeo/proclaimer/ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";
import {
  avParticipationTypeLabels,
  avParticipationTypes,
  type AvParticipationType,
} from "../../../../utils/av-participation-type-labels.ts";
import type { AvSelectorSettings } from "../../../../hooks/use-av-selector-settings.ts";
import { AddAvParticipantModal } from "../../../participation/components/add-av-participant-modal/AddAvParticipantModal.tsx";

const avParticipationTypeOptions: { label: string; value: AvParticipationType }[] =
  avParticipationTypes.map((type) => ({
    label: avParticipationTypeLabels[type],
    value: type,
  }));

interface AvSettingsAccordionProps {
  participation_type: AvParticipationType;
  settings: AvSelectorSettings;
  on_change: (settings: AvSelectorSettings) => void;
}

export function AvSettingsAccordion({
  participation_type,
  settings,
  on_change,
}: AvSettingsAccordionProps) {
  const { value, onIonChange } = useAccordionState(
    localStorageKeyWithVariant("avSelectorAccordion", participation_type),
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
            <AlertMultiSelect
              label="Weeks Away Calculated From"
              options={avParticipationTypeOptions}
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
      <AddAvParticipantModal
        participation_id={participation_type}
        modal_title={`${avParticipationTypeLabels[participation_type]} Participant`}
        is_open={add_modal_open}
        on_dismiss={() => set_add_modal_open(false)}
      />
    </>
  );
}
