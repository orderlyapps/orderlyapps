import type { AppSettings } from "../app-settings/types.ts";
import type { ResolvedTheme, ThemeMode } from "./types.ts";
declare function subscribe(listener: () => void): () => void;
declare function getModeSnapshot(): ThemeMode;
declare function getResolvedSnapshot(): ResolvedTheme;
declare function setModeInternal(next: ThemeMode): void;
export interface InitThemeOptions {
  /**
   * Class toggled on `<html>` when the resolved theme is dark.
   * Pass `"ion-palette-dark"` for Ionic apps, or any custom class.
   * Omit to skip class toggling entirely.
   */
  darkClass?: string;
}
/**
 * Initialises theme mode from the rxdb-backed settings store.
 * The store must expose a `themeMode` setting (`AppSettings<{ themeMode: ThemeMode }>`).
 * Returns a Promise so callers can `await` the async rxdb read.
 */
export declare function initTheme(
  store: AppSettings<{
    themeMode: ThemeMode;
  }>,
  options?: InitThemeOptions,
): Promise<void>;
export { subscribe, getModeSnapshot, getResolvedSnapshot, setModeInternal as setMode };
