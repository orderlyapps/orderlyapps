import { useState } from "react";
import { IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { exportAppSettings, type AppSettings, type SettingsMap } from "@amodeo/utils";
import { useErrorToast } from "../error-toast/use-error-toast.ts";

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
  const { presentError } = useErrorToast();
  const [success, setSuccess] = useState<string | null>(null);

  async function handleExport() {
    setSuccess(null);
    try {
      await exportAppSettings(store, { fileName, extension });
      setSuccess("Settings exported.");
    } catch (err) {
      presentError(err);
    }
  }

  return (
    <>
      <IonItem button detail={false} onClick={() => void handleExport()}>
        <IonIcon icon={downloadOutline} slot="start" />
        <IonLabel>{label}</IonLabel>
      </IonItem>
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
