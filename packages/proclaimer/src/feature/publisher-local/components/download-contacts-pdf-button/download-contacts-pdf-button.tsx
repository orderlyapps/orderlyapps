import { IonButton, IonSpinner } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import type React from "react";
import { useState } from "react";
import { ContactsPdfDocument } from "./components/contacts-pdf-document/contacts-pdf-document.tsx";
import { useContactsForExport } from "./hooks/use-contacts-for-export/use-contacts-for-export.ts";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";

interface DownloadContactsPdfButtonProps {
  title?: string;
  subtitle?: string;
  filename?: string;
}

export const DownloadContactsPdfButton: React.FC<DownloadContactsPdfButtonProps> = ({
  title = "Elder Contact List",
  subtitle,
  filename = "elder-contact-list",
}) => {
  const { data: contacts, isLoading, error } = useContactsForExport();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (contacts.length === 0) return;

    setIsGenerating(true);

    try {
      const pdfDocument = (
        <ContactsPdfDocument contacts={contacts} title={title} subtitle={subtitle} />
      );

      const blob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (error) {
    return <Body color="danger">Unable to load contact data for export: {error.message}</Body>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (contacts.length === 0) {
    return <Body>No records found to export.</Body>;
  }

  return (
    <>
      <Space size="2xl" />
      <IonButton
        expand="block"
        fill="outline"
        onClick={handleDownload}
        disabled={isGenerating}
        className="ion-margin"
      >
        {isGenerating ? (
          <>
            <IonSpinner name="crescent" style={{ marginRight: "8px" }} />
            Generating PDF...
          </>
        ) : (
          `Export ${contacts.length} Records to PDF`
        )}
      </IonButton>
    </>
  );
};
