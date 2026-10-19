import { createAppPreferences, type AppPreferencesSettings } from "@amodeo/utils";

export type SubbiePreferencesSettings = AppPreferencesSettings;

let settingsPromise: Promise<SubbiePreferencesSettings> | null = null;

export function getAppSettings(): Promise<SubbiePreferencesSettings> {
  settingsPromise ??= createAppPreferences({
    dbName: "subbie-preferences",
    darkClass: "ion-palette-dark",
  });
  return settingsPromise;
}
