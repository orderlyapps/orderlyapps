import { useState } from "react";
import { ModalSelect } from "@amodeo/proclaimer/ui/components/inputs/modal-select/ModalSelect";
import { CongregationSelectModal } from "./congregation-select-modal/CongregationSelectModal";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";

export function CongregationSelect() {
  const [showModal, setShowModal] = useState(false);
  const [congregation, setCongregation] = useState(getStoredCongregation);

  const handleSelect = () => {
    setCongregation(getStoredCongregation());
  };

  return (
    <>
      {!congregation && (
        <ModalSelect
          label="Congregation"
          display_value={""}
          placeholder="Select congregation..."
          on_open={() => setShowModal(true)}
        />
      )}

      <CongregationSelectModal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
