import {
  createAppPreferences,
  type AppPreferencesSettings,
} from "./app-settings/init-app-preferences.ts";

export type SubbiePreferencesSettings = AppPreferencesSettings;

let settingsPromise: Promise<SubbiePreferencesSettings> | null = null;

export function getAppSettings(): Promise<SubbiePreferencesSettings> {
  settingsPromise ??= createAppPreferences({
    dbName: "subbie-preferences",
    darkClass: "ion-palette-dark",
  });
  return settingsPromise;
}
