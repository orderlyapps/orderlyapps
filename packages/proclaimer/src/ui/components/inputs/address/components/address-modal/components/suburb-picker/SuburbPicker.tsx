import { useState } from "react";
import { ModalSelect } from "../../../../../modal-select/ModalSelect.tsx";
import { SuburbPickerModal } from "./components/suburb-picker-modal/SuburbPickerModal.tsx";
import type { Suburb } from "@amodeo/proclaimer/feature/territory";

type SuburbPickerProps = {
  value?: { id: string; name: string };
  onSelect: (suburb: Suburb) => void;
};

export function SuburbPicker({ value, onSelect }: SuburbPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelect(suburb: Suburb) {
    onSelect(suburb);
    setIsModalOpen(false);
  }

  return (
    <>
      <ModalSelect
        label="Suburb"
        display_value={value?.name ?? ""}
        placeholder="Choose a suburb..."
        on_open={() => setIsModalOpen(true)}
      />
      <SuburbPickerModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
