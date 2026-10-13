import { IonButton } from "@ionic/react";
import { Packer, type Document } from "docx";

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
  const handleDownload = async () => {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <IonButton onClick={handleDownload} fill="clear" size="small">
      {label}
    </IonButton>
  );
}
