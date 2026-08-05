import { useRef, useState, type ChangeEvent } from "react";
import { IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { importAppSettings, type AppSettings, type SettingsMap } from "@amodeo/utils";

export interface ImportSettingsItemProps<T extends SettingsMap> {
  /** The settings store to import into. */
  store: AppSettings<T>;
  /** Clear existing settings before importing. Defaults to `false`. */
  replace?: boolean;
  /**
   * File extension shown in the file picker, with or without a leading dot.
   * Defaults to `"json"`.
   */
  extension?: string;
  /** Text shown in the item. Defaults to `"Import settings"`. */
  label?: string;
  /**
   * Reload the page after a successful import so settings applied at
   * startup (e.g. theme, font size) take effect. Defaults to `true`.
   */
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
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      await importAppSettings(store, await file.text(), { replace });
      if (reloadAfterImport) window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import settings.");
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
        isOpen={error !== null}
        message={error ?? ""}
        color="danger"
        duration={3000}
        onDidDismiss={() => setError(null)}
      />
    </>
  );
}
