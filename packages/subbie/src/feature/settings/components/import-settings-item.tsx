import { useRef, useState, type ChangeEvent } from "react";
import { IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { useErrorToast } from "@amodeo/ionic";
import type { AppSettings, SettingsMap } from "../app-settings/types.ts";
import { importAppSettings } from "../app-settings/settings-transfer.ts";

export interface ImportSettingsItemProps<T extends SettingsMap> {
  store: AppSettings<T>;
  replace?: boolean;
  extension?: string;
  label?: string;
  reloadAfterImport?: boolean;
}

export function ImportSettingsItem<T extends SettingsMap>({
  store,
  replace,
  extension = "json",
  label = "Import settings",
  reloadAfterImport = true,
}: ImportSettingsItemProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { presentError } = useErrorToast();
  const [success, setSuccess] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setSuccess(null);
    if (file.size > 1_000_000) {
      presentError(new Error("Settings file is too large (maximum 1 MB)."));
      return;
    }
    try {
      const { imported, skipped } = await importAppSettings(store, await file.text(), { replace });
      const message =
        `Imported ${imported.length} setting${imported.length === 1 ? "" : "s"}` +
        (skipped.length > 0 ? `, skipped ${skipped.length}.` : ".");
      setSuccess(reloadAfterImport ? `${message} Reloading…` : message);
      if (reloadAfterImport) setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      presentError(err);
    }
  }

  return (
    <>
      <IonItem button detail={false} onClick={() => inputRef.current?.click()}>
        <IonIcon icon={cloudUploadOutline} slot="start" />
        <IonLabel>{label}</IonLabel>
      </IonItem>
      <input
        ref={inputRef}
        type="file"
        accept={`.${extension.replace(/^\.+/, "")}`}
        hidden
        onChange={(e) => void handleFile(e)}
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
