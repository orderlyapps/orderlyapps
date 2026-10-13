import { IonButton } from "@ionic/react";
import { Packer, type Document } from "docx";

interface DocxDownloadButtonProps {
  doc: Document;
  fileName: string;
  label?: string;
}

export function DocxDownloadButton({ doc, fileName, label = "Download" }: DocxDownloadButtonProps) {
  const handleDownload = async () => {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url));
  };

  return (
    <IonButton onClick={handleDownload} fill="clear" size="small">
      {label}
    </IonButton>
  );
}
