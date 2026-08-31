import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { TextButton } from "../../../../ui/components/inputs/button/text/TextButton.tsx";
import { AllReportsPdf } from "../all-reports-pdf/all-reports-pdf.tsx";
import { useAllReportsData } from "./hooks/use-all-reports-data.ts";
import {
  getCurrentAndPreviousServiceYears,
  getPreviousTwoServiceYears,
} from "../utils/service-year.ts";
import { ServiceYearActionSheet } from "./components/service-year-action-sheet/service-year-action-sheet.tsx";
import { DownloadBackdrop } from "./components/download-backdrop/download-backdrop.tsx";

export function DownloadAllReportsButton() {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_generating, set_is_generating] = useState(false);
  const { buildEntries } = useAllReportsData();

  async function generatePdf(service_years: string[], file_suffix: string) {
    set_is_generating(true);
    // Yield to the browser so the action sheet dismissal and backdrop can
    // paint before we start the heavy synchronous PDF work on the main thread.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    try {
      const entries = buildEntries(service_years);
      if (entries.length === 0) return;
      const blob = await pdf(<AllReportsPdf entries={entries} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `All_Reports_${file_suffix}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      set_is_generating(false);
    }
  }

  const handle_current_previous = () => {
    set_is_modal_open(false);
    void generatePdf(getCurrentAndPreviousServiceYears(), "current_and_previous");
  };

  const handle_previous_two = () => {
    set_is_modal_open(false);
    void generatePdf(getPreviousTwoServiceYears(), "previous_two");
  };

  return (
    <>
      <TextButton
        label="Download Publisher Records"
        disabled={is_generating}
        on_click={() => set_is_modal_open(true)}
      />
      <ServiceYearActionSheet
        is_open={is_modal_open}
        on_close={() => set_is_modal_open(false)}
        on_select_current_previous={handle_current_previous}
        on_select_previous_two={handle_previous_two}
      />
      <DownloadBackdrop is_open={is_generating} message="Generating PDF report..." />
    </>
  );
}
