export type { Size } from "./types/size.ts";
export type { FontSize } from "./font-size/types.ts";
export type { IonicColor } from "./vendor/ionic/types/ionic-color.ts";

export {
  FONT_SCALE_MAP,
  DEFAULT_FONT_SIZE,
  isValidFontSize,
  initFontSize,
} from "./font-size/font-size.ts";

export { useFontSize, type UseFontSizeResult } from "./font-size/use-font-size.ts";

export type {
  JsonValue,
  SettingsMap,
  AppSettings,
  AppDatabase,
  SettingsDoc,
  CreateAppSettingsOptions,
  CreateAppDatabaseOptions,
  ImportAppDatabaseResult,
  RxCollection,
  RxDatabase,
  RxStorage,
} from "./app-settings/types.ts";

export { createAppSettings, createAppDatabase } from "./app-settings/app-settings.ts";

export {
  exportAppSettings,
  exportAppDatabase,
  resolveSettingsFileName,
  type ExportAppSettingsOptions,
} from "./app-settings/export-app-settings.ts";

export {
  importAppSettings,
  importAppDatabase,
  parseAppSettings,
  parseAppDatabase,
  type ImportAppSettingsOptions,
  type ImportAppSettingsResult,
  type ImportAppDatabaseOptions,
} from "./app-settings/import-app-settings.ts";

export { useAppSettings, type UseAppSettingsResult } from "./app-settings/use-app-settings.ts";

export type {
  ThemeMode,
  AppPreferences,
  AppPreferencesSettings,
  CreateAppPreferencesOptions,
} from "./app-preferences/types.ts";

export { createAppPreferences } from "./app-preferences/app-preferences.ts";

export type { ResolvedTheme } from "./theme/types.ts";

export { initTheme, type InitThemeOptions } from "./theme/theme.ts";

export { useTheme, type UseThemeResult } from "./theme/use-theme.ts";

export { toError, getErrorMessage } from "./errors/errors.ts";
