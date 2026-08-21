import type { AppSettings } from "../app-settings/types.ts";
import type { ResolvedTheme, ThemeMode } from "./types.ts";

const FALLBACK_COLORS: Record<ResolvedTheme, string> = {
  light: "#0054e9",
  dark: "#eb445a",
};

let cachedColors: Record<ResolvedTheme, string> | null = null;

function getThemeColors(): Record<ResolvedTheme, string> {
  if (cachedColors) return cachedColors;
  const light = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  );
  const dark = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  );
  cachedColors = {
    light: light?.content || FALLBACK_COLORS.light,
    dark: dark?.content || FALLBACK_COLORS.dark,
  };
  return cachedColors;
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeColor(resolved: ResolvedTheme): void {
  const color = getThemeColors()[resolved];
  document.querySelectorAll('meta[name="theme-color"]').forEach((el) => {
    el.setAttribute("content", color);
  });
  cachedColors = null;
}

function applyTheme(mode: ThemeMode, darkClass: string): ResolvedTheme {
  const resolved = mode === "system" ? getSystemTheme() : mode;
  if (darkClass) {
    document.documentElement.classList.toggle(darkClass, resolved === "dark");
  }
  document.documentElement.style.colorScheme = resolved;
  updateThemeColor(resolved);
  return resolved;
}

let currentMode: ThemeMode = "system";
let currentResolved: ResolvedTheme = "light";
let activeDarkClass = "";
let settingsStore: AppSettings<{ themeMode: ThemeMode }> | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getModeSnapshot(): ThemeMode {
  return currentMode;
}

function getResolvedSnapshot(): ResolvedTheme {
  return currentResolved;
}

function notify(): void {
  listeners.forEach((l) => l());
}

function setModeInternal(next: ThemeMode): void {
  if (next === currentMode) return;
  currentMode = next;
  currentResolved = applyTheme(next, activeDarkClass);
  if (settingsStore) settingsStore.set("themeMode", next).catch(console.error);
  notify();
}

if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentMode === "system") {
      currentResolved = applyTheme("system", activeDarkClass);
      notify();
    }
  });
}

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
export async function initTheme(
  store: AppSettings<{ themeMode: ThemeMode }>,
  options: InitThemeOptions = {},
): Promise<void> {
  settingsStore = store;
  activeDarkClass = options.darkClass ?? "";
  const stored = await store.get("themeMode");
  currentMode = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  currentResolved = applyTheme(currentMode, activeDarkClass);
}

export { subscribe, getModeSnapshot, getResolvedSnapshot, setModeInternal as setMode };
