export type { Size } from "./types/size.ts";
export type { FontSize } from "./font-size/types.ts";

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
  CreateAppSettingsOptions,
  RxStorage,
} from "./app-settings/types.ts";

export { createAppSettings } from "./app-settings/app-settings.ts";

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
