import { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import { pdf } from "@react-pdf/renderer";
import { MidweekMeetingAssignmentPdf } from "./components/midweek-meeting-assignment-pdf/MidweekMeetingAssignmentPdf.tsx";
import type { MidweekMeetingAssignmentPdfData } from "./components/midweek-meeting-assignment-pdf/MidweekMeetingAssignmentPdf.tsx";

type MidweekMeetingAssignmentShareButtonProps = {
  data: MidweekMeetingAssignmentPdfData;
  filename: string;
};

export function MidweekMeetingAssignmentShareButton({
  data,
  filename,
}: MidweekMeetingAssignmentShareButtonProps) {
  const [is_generating, set_is_generating] = useState(false);

  const download_fallback = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handle_share = async () => {
    set_is_generating(true);
    try {
      const blob = await pdf(<MidweekMeetingAssignmentPdf data={data} />).toBlob();
      const file = new File([blob], `${filename}.pdf`, { type: "application/pdf" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
      } else {
        download_fallback(blob);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Failed to share PDF:", err);
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <IonButton fill="clear" size="small" disabled={is_generating} onClick={handle_share}>
      <IonIcon slot="icon-only" icon={shareOutline} />
    </IonButton>
  );
}
