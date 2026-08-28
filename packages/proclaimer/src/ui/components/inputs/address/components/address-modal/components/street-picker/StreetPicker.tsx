import { useState } from "react";
import { ModalSelect } from "../../../../../modal-select/ModalSelect.tsx";
import { StreetPickerModal } from "./components/street-picker-modal/StreetPickerModal.tsx";
import type { Street } from "../../../../../../../../database/schemas/street.ts";
import type { SuburbRef } from "../../../../types.ts";

type StreetPickerProps = {
  value?: { id: string; name: string };
  suburbId?: string;
  suburb?: SuburbRef;
  disabled?: boolean;
  onSelect: (street: Street) => void;
};

export function StreetPicker({
  value,
  suburbId,
  suburb,
  disabled = false,
  onSelect,
}: StreetPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelect(street: Street) {
    onSelect(street);
    setIsModalOpen(false);
  }

  return (
    <>
      <ModalSelect
        label="Street"
        display_value={value?.name ?? ""}
        placeholder="Choose a street..."
        disabled={disabled}
        on_open={() => setIsModalOpen(true)}
      />
      <StreetPickerModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        suburbId={suburbId}
        suburb={suburb}
      />
    </>
  );
}
