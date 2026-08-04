import { createAppSettings } from "../app-settings/app-settings.ts";
import { DEFAULT_FONT_SIZE } from "../font-size/font-size.ts";
import type { AppPreferences, CreateAppPreferencesOptions } from "./types.ts";

const DEFAULT_PREFERENCES: AppPreferences = {
  fontSize: DEFAULT_FONT_SIZE,
  themeMode: "system",
};

/**
 * Creates a reusable `AppSettings<AppPreferences>` store backed by rxdb.
 * Each app should call this once with a unique `dbName` and pass the result
 * to `initFontSize` and `initTheme`.
 */
export async function createAppPreferences(options: CreateAppPreferencesOptions) {
  return createAppSettings<AppPreferences>({
    dbName: options.dbName,
    defaults: { ...DEFAULT_PREFERENCES, ...options.defaults },
    storage: options.storage,
  });
}
