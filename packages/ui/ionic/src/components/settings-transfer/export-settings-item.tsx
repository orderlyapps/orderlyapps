import { useState } from "react";
import { IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { exportAppSettings, type AppSettings, type SettingsMap } from "@amodeo/utils";

export interface ExportSettingsItemProps<T extends SettingsMap> {
  /** The settings store to export from. */
  store: AppSettings<T>;
  /** Base name of the downloaded file (without extension). Defaults to `"app-settings"`. */
  fileName?: string;
  /** File extension for the download, with or without a leading dot. Defaults to `"json"`. */
  extension?: string;
  /** Text shown in the item. Defaults to `"Export settings"`. */
  label?: string;
}

export function ExportSettingsItem<T extends SettingsMap>({
  store,
  fileName,
  extension,
  label = "Export settings",
}: ExportSettingsItemProps<T>) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleExport() {
    setError(null);
    setSuccess(null);
    try {
      await exportAppSettings(store, { fileName, extension });
      setSuccess("Settings exported.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export settings.");
    }
  }

  return (
    <>
      <IonItem button detail={false} onClick={() => void handleExport()}>
        <IonIcon icon={downloadOutline} slot="start" />
        <IonLabel>{label}</IonLabel>
      </IonItem>
      <IonToast
        isOpen={error !== null}
        message={error ?? ""}
        color="danger"
        duration={3000}
        onDidDismiss={() => setError(null)}
      />
      <IonToast
        isOpen={success !== null}
        message={success ?? ""}
        color="success"
        duration={3000}
        onDidDismiss={() => setSuccess(null)}
      />
    </>
  );
}
