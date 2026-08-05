import { IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import type { AppSettings, SettingsMap } from "@amodeo/utils";
import { useImportSettings } from "./use-import-settings.ts";

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
  extension = "json",
  label = "Import settings",
  ...options
}: ImportSettingsItemProps<T>) {
  const { inputRef, error, success, handleFile, dismissError, dismissSuccess, openFilePicker } =
    useImportSettings(options);

  return (
    <>
      <IonItem button detail={false} onClick={openFilePicker}>
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
        onDidDismiss={dismissError}
      />
      <IonToast
        isOpen={success !== null}
        message={success ?? ""}
        color="success"
        duration={3000}
        onDidDismiss={dismissSuccess}
      />
    </>
  );
}
