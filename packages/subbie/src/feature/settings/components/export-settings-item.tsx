import { useState } from "react";
import { IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { useErrorToast } from "@amodeo/ionic";
import type { AppSettings, SettingsMap } from "../app-settings/types.ts";
import { exportAppSettings } from "../app-settings/settings-transfer.ts";

export interface ExportSettingsItemProps<T extends SettingsMap> {
  store: AppSettings<T>;
  fileName?: string;
  extension?: string;
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
