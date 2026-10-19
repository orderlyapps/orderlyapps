import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { FileUploadButton } from "@amodeo/proclaimer/ui/components/inputs/file/FileUploadButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import {
  importPublisherLocalRecords,
  parsePublisherLocalRecords,
} from "@amodeo/proclaimer/database/rxdb/helper/publisherLocalExportImport";
import type { PublisherLocal } from "../../schemas/publisher-local.ts";
import { ImportPreviewList } from "../import-preview-list/import-preview-list.tsx";

export function ImportPublisherDataButton() {
  const [presentAlert] = useIonAlert();
  const [loading, setLoading] = useState(false);
  const [preview_records, set_preview_records] = useState<PublisherLocal[] | null>(null);

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    file
      .text()
      .then((text) => {
        const records = parsePublisherLocalRecords(text);
        set_preview_records(records);
      })
      .catch((err: unknown) => {
        void presentAlert({
          header: "Import Failed",
          message: err instanceof Error ? err.message : "Could not parse import file.",
          buttons: ["OK"],
        });
      });
  };

  function handleClose() {
    if (loading) return;
    set_preview_records(null);
  }

  async function handleConfirmImport() {
    if (!preview_records) return;
    setLoading(true);
    try {
      await importPublisherLocalRecords(preview_records);
      set_preview_records(null);
      void presentAlert({
        header: "Import Successful",
        message: "Publisher data has been imported successfully.",
        buttons: ["OK"],
      });
    } catch (err: unknown) {
      void presentAlert({
        header: "Import Failed",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
        buttons: ["OK"],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <FileUploadButton
        label="Import Publisher Data"
        accept=".ord,.json"
        color="medium"
        fill="clear"
        expand="block"
        loading={loading}
        on_file_select={handleFileSelect}
      />
      <ResponsiveModal
        isOpen={preview_records !== null}
        onDidDismiss={handleClose}
        fullscreen={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Import Publisher Data</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={handleClose} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonNote color="medium" style={{ display: "block", marginBottom: "0.75rem" }}>
            Imported records will be merged with existing confidential publisher data. Where values
            conflict, the most recently updated value is kept.
          </IonNote>
          {preview_records && <ImportPreviewList records={preview_records} />}
          <Space size="sm" />
          <IonButton
            expand="block"
            onClick={() => void handleConfirmImport()}
            disabled={loading || !preview_records}
          >
            {loading ? (
              <>
                <IonSpinner name="crescent" style={{ marginRight: 8 }} />
                Importing…
              </>
            ) : (
              "Import"
            )}
          </IonButton>
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
