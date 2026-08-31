import { useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import { Icon } from "../../../../ui/components/icons/Icon.tsx";
import { AllReportsPdf } from "../all-reports-pdf/all-reports-pdf.tsx";
import { useAllReportsData } from "./hooks/use-all-reports-data.ts";
import {
  getCurrentAndPreviousServiceYears,
  getPreviousTwoServiceYears,
} from "../../utils/service-year.ts";
import { ServiceYearSelectModal } from "./components/service-year-select-modal/service-year-select-modal.tsx";

export function DownloadAllReportsButton() {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_generating, set_is_generating] = useState(false);
  const { buildEntries } = useAllReportsData();

  async function generatePdf(service_years: string[], file_suffix: string) {
    set_is_generating(true);
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
      set_is_modal_open(false);
    }
  }

  const handle_current_previous = () =>
    generatePdf(getCurrentAndPreviousServiceYears(), "current_and_previous");

  const handle_previous_two = () => generatePdf(getPreviousTwoServiceYears(), "previous_two");

  return (
    <>
      <IonButton fill="clear" onClick={() => set_is_modal_open(true)} disabled={is_generating}>
        {is_generating ? (
          <IonSpinner name="crescent" style={{ marginRight: 8 }} />
        ) : (
          <Icon name="download" slot="start" />
        )}
        Download All
      </IonButton>
      <ServiceYearSelectModal
        is_open={is_modal_open}
        is_generating={is_generating}
        on_close={() => set_is_modal_open(false)}
        on_select_current_previous={handle_current_previous}
        on_select_previous_two={handle_previous_two}
      />
    </>
  );
}
