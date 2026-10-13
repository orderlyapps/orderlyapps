import { useState } from "react";
import { IonActionSheet, IonButton } from "@ionic/react";
import { downloadOutline, shareOutline } from "ionicons/icons";
import { Packer, type Document } from "docx";

const DOCX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

interface DocxDownloadButtonProps {
  doc: Document;
  file_name: string;
  label?: string;
}

export function DocxDownloadButton({
  doc,
  file_name,
  label = "Download",
}: DocxDownloadButtonProps) {
  const [is_open, set_is_open] = useState(false);

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownload = async () => {
    downloadBlob(await Packer.toBlob(doc));
  };

  const handleShare = async () => {
    try {
      const blob = await Packer.toBlob(doc);
      const file = new File([blob], file_name, { type: DOCX_MIME_TYPE });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: file_name });
      } else {
        downloadBlob(blob);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Failed to share docx:", err);
    }
  };

  return (
    <>
      <IonButton onClick={() => set_is_open(true)} fill="clear" size="small">
        {label}
      </IonButton>
      <IonActionSheet
        isOpen={is_open}
        header={file_name}
        onDidDismiss={() => set_is_open(false)}
        buttons={[
          { text: "Download", icon: downloadOutline, handler: handleDownload },
          { text: "Share", icon: shareOutline, handler: handleShare },
          { text: "Cancel", role: "cancel" },
        ]}
      />
    </>
  );
}
