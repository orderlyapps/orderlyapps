import type { AppSettings } from "../app-settings/types.ts";
import type { FontSize } from "../font-size/types.ts";
import type { SettingsMap } from "../app-settings/types.ts";

export type ThemeMode = "light" | "dark" | "system";

/**
 * Shared app preferences stored via rxdb. Each app creates a single
 * `AppSettings<AppPreferences>` store and passes it to `initFontSize` /
 * `initTheme` so both features persist through the same database.
 */
export interface AppPreferences extends SettingsMap {
  fontSize: FontSize;
  themeMode: ThemeMode;
}

/** A concrete `AppSettings` store backed by `AppPreferences`. */
export type AppPreferencesSettings = AppSettings<AppPreferences>;

export interface CreateAppPreferencesOptions {
  /** RxDB database name. Use a unique name per app (e.g. `"subbie-preferences"`). */
  dbName: string;
  /** Optional overrides for the default preference values. */
  defaults?: Partial<AppPreferences>;
  /**
   * Optional RxDB storage factory. Defaults to IndexedDB (via `getRxStorageDexie`).
   * Pass a different storage (e.g. `getRxStorageMemory()`) for tests.
   */
  storage?: import("../app-settings/types.ts").RxStorage<any, any>;
}
