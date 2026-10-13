import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useErrorToast } from "@amodeo/ionic";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { ResponsiveModal } from "../../../../ui/components/display/responsive-modal/ResponsiveModal.tsx";
import { CloseIconButton } from "../../../../ui/components/inputs/button/icon/close/CloseIconButton.tsx";
import { Select } from "../../../../ui/components/inputs/select/Select.tsx";
import type { NameValue } from "../../../../ui/components/inputs/name/NameInput.tsx";
import { publisherCollection } from "../../collections/publisher.ts";
import type { Publisher } from "../../schemas/publisher.ts";
import { PublisherNameInput } from "../publisher-name-input/publisher-name-input.tsx";

const empty_name: NameValue = {
  first_name: "",
  middle_name: null,
  last_name: "",
  display_name: null,
};

const genderOptions: { label: string; value: Publisher["gender"] }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const standingOptions: { label: string; value: Publisher["standing"] }[] = [
  { label: "Publisher", value: "publisher" },
  { label: "Unbaptised Publisher", value: "unbaptised_publisher" },
  { label: "Ministerial Servant", value: "ministerial_servant" },
  { label: "Elder", value: "elder" },
];

const typeOptions: { label: string; value: Publisher["type"] }[] = [
  { label: "Publisher", value: "publisher" },
  { label: "Continuous Auxiliary", value: "continuous_auxiliary" },
  { label: "Special Pioneer", value: "special_pioneer" },
  { label: "Regular Pioneer", value: "regular_pioneer" },
  { label: "Circuit Overseer", value: "circuit_overseer" },
  { label: "Inactive", value: "inactive" },
  { label: "Associate", value: "associate" },
  { label: "Removed", value: "removed" },
];

interface AddPublisherModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddPublisherModal({ is_open, on_dismiss }: AddPublisherModalProps) {
  const congregation_id = useStoredCongregation()?.id;
  const { presentError } = useErrorToast({ describeError: describeSupabaseError });
  const [name, set_name] = useState<NameValue>(empty_name);
  const [gender, set_gender] = useState<Publisher["gender"] | null>(null);
  const [standing, set_standing] = useState<Publisher["standing"]>("publisher");
  const [type, set_type] = useState<Publisher["type"]>("publisher");
  const [is_saving, set_is_saving] = useState(false);

  const is_valid = !!name.first_name.trim() && !!name.last_name.trim() && !!gender;

  function handleDismiss() {
    set_name(empty_name);
    set_gender(null);
    set_standing("publisher");
    set_type("publisher");
    on_dismiss();
  }

  async function handleSave() {
    if (!congregation_id || !is_valid || is_saving) return;
    set_is_saving(true);
    try {
      const tx = publisherCollection.insert({
        id: crypto.randomUUID(),
        congregation_id,
        first_name: name.first_name,
        middle_name: name.middle_name,
        last_name: name.last_name,
        display_name: name.display_name,
        gender: gender ?? "male",
        standing,
        type,
      });
      await tx.isPersisted.promise;
      handleDismiss();
    } catch (error) {
      presentError(error);
    } finally {
      set_is_saving(false);
    }
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
          <IonTitle>Add Publisher</IonTitle>
          <IonButtons slot="end">
            <IonButton strong disabled={!is_valid || is_saving} onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <PublisherNameInput value={name} on_change={set_name} />
          <Select
            label="Gender"
            value={gender}
            placeholder="Select gender"
            options={genderOptions}
            on_change={(value) => set_gender(value as Publisher["gender"])}
          />
          <Select
            label="Standing"
            value={standing}
            options={standingOptions}
            on_change={(value) => set_standing(value as Publisher["standing"])}
          />
          <Select
            label="Service Type"
            value={type}
            options={typeOptions}
            on_change={(value) => set_type(value as Publisher["type"])}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
