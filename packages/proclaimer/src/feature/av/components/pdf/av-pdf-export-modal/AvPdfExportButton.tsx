import { useState } from "react";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { AvPdfExportModal } from "./AvPdfExportModal.tsx";

export function AvPdfExportButton() {
  const [is_modal_open, set_is_modal_open] = useState(false);

  return (
    <>
      <TextButton label="Export to PDF" on_click={() => set_is_modal_open(true)} />
      <AvPdfExportModal is_open={is_modal_open} on_dismiss={() => set_is_modal_open(false)} />
    </>
  );
}
