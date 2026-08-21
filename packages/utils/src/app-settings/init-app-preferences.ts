import { createAppSettings } from "./app-settings.ts";
import type { AppDatabase, AppSettings, RxStorage } from "./types.ts";
import { DEFAULT_FONT_SIZE } from "../font-size/font-size.ts";
import { initFontSize } from "../font-size/font-size.ts";
import type { FontSize } from "../font-size/types.ts";
import { initTheme } from "../theme/theme.ts";
import type { ThemeMode } from "../theme/types.ts";

/** Settings store shape for app preferences (fontSize + themeMode). */
export type AppPreferencesSettings = AppSettings<{ fontSize: FontSize; themeMode: ThemeMode }>;

export interface InitAppPreferencesOptions {
  /**
   * Class toggled on `<html>` when the resolved theme is dark.
   * Pass `"ion-palette-dark"` for Ionic apps, or any custom class.
   * Omit to skip class toggling entirely.
   */
  darkClass?: string;
}

/**
 * Convenience helper that runs `initTheme` and `initFontSize` against a single
 * shared settings store. The store must expose both `fontSize` and `themeMode`
 * settings. Apps with a different settings shape should call `initTheme` and
 * `initFontSize` directly.
 */
export async function initAppPreferences(
  store: AppPreferencesSettings,
  options: InitAppPreferencesOptions = {},
): Promise<void> {
  await Promise.all([initTheme(store, { darkClass: options.darkClass }), initFontSize(store)]);
}

export interface CreateAppPreferencesOptions {
  /**
   * RxDB database name for standalone mode. Defaults to `"preference-db"`.
   * Ignored when `database` is provided. Use a unique name per app if multiple
   * apps share the same origin.
   */
  dbName?: string;
  /**
   * Shared database from `createAppDatabase`. When provided, preferences are
   * stored as a `"preferences"` document within the shared database, enabling
   * unified export/import with other settings domains.
   */
  database?: AppDatabase;
  /**
   * Class toggled on `<html>` when the resolved theme is dark.
   * Pass `"ion-palette-dark"` for Ionic apps, or any custom class.
   * Omit to skip class toggling entirely.
   */
  darkClass?: string;
  /** Optional overrides for the default preference values. */
  defaults?: Partial<{ fontSize: FontSize; themeMode: ThemeMode }>;
  /**
   * Optional RxDB storage factory. Defaults to IndexedDB (via `getRxStorageDexie`).
   * Pass a different storage (e.g. `getRxStorageMemory()`) for tests.
   */
  storage?: RxStorage<any, any>;
}

/**
 * Creates a preferences store backed by rxdb and runs `initTheme` +
 * `initFontSize` against it in one call. Defaults are baked in:
 * `dbName: "preference-db"`, `docId: "preferences"`,
 * `defaults: { fontSize: "md", themeMode: "system" }`.
 *
 * All options are optional — pass only what you want to override.
 */
export async function createAppPreferences(
  options: CreateAppPreferencesOptions = {},
): Promise<AppPreferencesSettings> {
  return createAppSettings<{ fontSize: FontSize; themeMode: ThemeMode }>({
    database: options.database,
    dbName: options.dbName ?? "preference-db",
    docId: "preferences",
    defaults: { fontSize: DEFAULT_FONT_SIZE, themeMode: "system", ...options.defaults },
    storage: options.storage,
    onInit: (store) => initAppPreferences(store, { darkClass: options.darkClass }),
  });
}
