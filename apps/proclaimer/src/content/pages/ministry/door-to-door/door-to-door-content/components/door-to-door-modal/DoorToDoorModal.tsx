import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonModal } from "@ionic/react";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { TextInput } from "@amodeo/proclaimer/ui/components/inputs/text/TextInput";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { SuburbSelect } from "@amodeo/proclaimer/feature/map";
import { StreetSelect } from "@amodeo/proclaimer/feature/map";
import { saveDoNotCall } from "@amodeo/proclaimer/feature/map";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { VisitTypeSelect } from "./components/visit-type-select/VisitTypeSelect";
import { saveNotAtHome } from "./save-not-at-home";
import { saveReturnVisit } from "../return-visit-add-modal/save-return-visit";
import { useDoorToDoorForm } from "./use-door-to-door-form";

type DoorToDoorModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSave: (coordinates: [number, number]) => void;
};

export function DoorToDoorModal({ isOpen, onDidDismiss, onSave }: DoorToDoorModalProps) {
  const {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    visitType,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
    handleVisitTypeChange,
    resetAfterSave,
  } = useDoorToDoorForm();
  const { has_service_overseer, has_congregation_admin, is_super_admin } = usePermissions();
  const can_add_do_not_call = has_service_overseer || has_congregation_admin || is_super_admin;
  const resolvedVisitType =
    visitType === "do_not_call" && !can_add_do_not_call ? "return" : visitType;

  async function handleSave() {
    if (!selectedSuburb || !selectedStreet) return;
    const coordinates =
      resolvedVisitType === "do_not_call"
        ? await saveDoNotCall({
            suburb: selectedSuburb,
            street: selectedStreet,
            house_number: houseNumber,
            unit_number: unitNumber,
            notes: "",
          })
        : resolvedVisitType === "return_visit"
          ? await saveReturnVisit({
              suburb: selectedSuburb,
              street: selectedStreet,
              house_number: houseNumber,
              unit_number: unitNumber,
            })
          : await saveNotAtHome({
              suburb: selectedSuburb,
              street: selectedStreet,
              house_number: houseNumber,
              unit_number: unitNumber,
              visit_type: resolvedVisitType,
            });
    if (coordinates) {
      resetAfterSave();
      onSave(coordinates);
    }
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Door to Door</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onDidDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SuburbSelect
          label="Suburb"
          value={selectedSuburb}
          placeholder="Choose a suburb..."
          onSelect={handleSuburbSelect}
        />

        <StreetSelect
          label="Street"
          value={selectedStreet}
          placeholder="Choose a street..."
          disabled={!selectedSuburb}
          suburbId={selectedSuburb?.id}
          suburb={selectedSuburb}
          onSelect={handleStreetSelect}
        />

        <TextInput
          label="House Number"
          value={houseNumber}
          placeholder="Enter house number..."
          disabled={!selectedStreet}
          on_change={handleHouseNumberChange}
        />

        <TextInput
          label="Unit Number"
          value={unitNumber}
          placeholder="Enter unit number..."
          disabled={!houseNumber}
          on_change={handleUnitNumberChange}
        />

        <VisitTypeSelect
          value={resolvedVisitType}
          disabled={!houseNumber}
          include_do_not_call={can_add_do_not_call}
          on_change={handleVisitTypeChange}
        />
        {houseNumber && <Space />}
        {houseNumber && <SaveTextButton skip_confirmation on_click={handleSave} />}
      </IonContent>
    </IonModal>
  );
}
