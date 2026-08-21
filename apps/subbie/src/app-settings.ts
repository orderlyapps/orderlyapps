import { createAppPreferences, type AppPreferencesSettings } from "@amodeo/utils";

export type SubbiePreferencesSettings = AppPreferencesSettings;

export const appSettings = createAppPreferences({
  dbName: "subbie-preferences",
  darkClass: "ion-palette-dark",
});
