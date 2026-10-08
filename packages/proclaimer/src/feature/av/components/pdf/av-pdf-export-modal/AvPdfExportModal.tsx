import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { format } from "date-fns";
import { downloadOutline, shareOutline } from "ionicons/icons";
import { pdf } from "@react-pdf/renderer";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { ToggleInput } from "@amodeo/proclaimer/ui/components/inputs/toggle/ToggleInput";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { MonthPicker } from "@amodeo/proclaimer/ui/components/inputs/month-picker/MonthPicker";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { getStoredPublisher } from "@amodeo/proclaimer/feature/publisher";
import { AudioVideoPdfDocument } from "../audio-video-pdf/AudioVideoPdfDocument.tsx";
import { PdfPublisherSelect } from "@amodeo/proclaimer/ui/components/inputs/pdf-publisher-select/PdfPublisherSelect";
import { useAudioVideoScheduleData } from "../../../hooks/use-audio-video-schedule-data.ts";

type MonthRange = {
  readonly firstMonday: string;
  readonly lastMonday: string;
};

interface AvPdfExportModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AvPdfExportModal({ is_open, on_dismiss }: AvPdfExportModalProps) {
  const [selected_month, set_selected_month] = useState<MonthRange | null>(null);
  const [is_generating, set_is_generating] = useState(false);
  const [error_message, set_error_message] = useState<string | null>(null);
  const [pdf_publisher, set_pdf_publisher] = useState<Publisher | null>(getStoredPublisher);
  const [highlight_publisher, set_highlight_publisher] = useState(false);

  const congregation = useStoredCongregation();
  const { weeks, isLoading } = useAudioVideoScheduleData(selected_month);

  const get_filename = () => {
    if (!selected_month) return "Audio-Video";
    const first = format(new Date(selected_month.firstMonday), "MMM-d");
    const last = format(new Date(selected_month.lastMonday), "MMM-d-yyyy");
    return `Audio-Video_${first}_${last}`;
  };

  const generate_pdf = async () => {
    if (!selected_month) return null;
    return pdf(
      <AudioVideoPdfDocument
        weeks={weeks}
        isLoading={isLoading}
        dateRange={selected_month}
        highlightPublisherId={highlight_publisher ? pdf_publisher?.id : undefined}
      />,
    ).toBlob();
  };

  const download_blob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${get_filename()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handle_download = async () => {
    set_is_generating(true);
    set_error_message(null);
    try {
      const blob = await generate_pdf();
      if (blob) download_blob(blob);
    } catch {
      set_error_message("Failed to generate PDF. Please try again.");
    } finally {
      set_is_generating(false);
    }
  };

  const handle_share = async () => {
    set_is_generating(true);
    set_error_message(null);
    try {
      const blob = await generate_pdf();
      if (!blob) return;
      const filename = `${get_filename()}.pdf`;
      const file = new File([blob], filename, { type: "application/pdf" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
      } else {
        download_blob(blob);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      set_error_message("Failed to share PDF. Please try again.");
    } finally {
      set_is_generating(false);
    }
  };

  const handle_dismiss = () => {
    set_selected_month(null);
    set_error_message(null);
    set_highlight_publisher(false);
    on_dismiss();
  };

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handle_dismiss} fullscreen={false}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <CloseIconButton on_click={handle_dismiss} skip_confirmation />
          </IonButtons>
          <IonTitle>Audio & Video Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <MonthPicker
          label="Select Month"
          value={selected_month ? selected_month.firstMonday.substring(0, 7) : undefined}
          on_value_change={set_selected_month}
        />

        <Space />

        {selected_month && (
          <ToggleInput
            label="Highlight Publisher"
            checked={highlight_publisher}
            on_change={set_highlight_publisher}
          />
        )}

        <Space />

        {highlight_publisher && <PdfPublisherSelect on_change={set_pdf_publisher} />}

        <Space />

        {error_message && (
          <p style={{ color: "var(--ion-color-danger)", fontSize: "0.875rem", margin: "0.5rem 0" }}>
            {error_message}
          </p>
        )}

        {!congregation ? (
          <TextButton expand="block" disabled label="No congregation selected" />
        ) : (
          selected_month && (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextButton
                    icon={shareOutline}
                    disabled={is_generating || isLoading}
                    on_click={handle_share}
                    label={is_generating ? "Generating..." : isLoading ? "Loading..." : "Share"}
                  />
                </IonCol>
                <IonCol>
                  <TextButton
                    icon={downloadOutline}
                    disabled={is_generating || isLoading}
                    on_click={handle_download}
                    label={is_generating ? "Generating..." : isLoading ? "Loading..." : "Download"}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          )
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
