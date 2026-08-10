import { createAppSettings } from "../app-settings/app-settings.ts";
import { DEFAULT_FONT_SIZE } from "../font-size/font-size.ts";
import type { AppPreferences, CreateAppPreferencesOptions } from "./types.ts";

const DEFAULT_PREFERENCES: AppPreferences = {
  fontSize: DEFAULT_FONT_SIZE,
  themeMode: "system",
};

/** Document ID used by preferences stores within a shared `AppDatabase`. */
const PREFERENCES_DOC_ID = "preferences";

/**
 * Creates a reusable `AppSettings<AppPreferences>` store backed by rxdb.
 *
 * In standalone mode (passing `dbName`), each app should call this once with
 * a unique name and pass the result to `initFontSize` and `initTheme`.
 *
 * In shared mode (passing `database` from `createAppDatabase`), preferences
 * are stored as a `"preferences"` document within the shared database,
 * enabling unified export/import alongside other settings domains.
 */
export async function createAppPreferences(options: CreateAppPreferencesOptions) {
  return createAppSettings<AppPreferences>({
    database: options.database,
    dbName: options.dbName,
    docId: options.database ? PREFERENCES_DOC_ID : undefined,
    defaults: { ...DEFAULT_PREFERENCES, ...options.defaults },
    storage: options.storage,
  });
}
