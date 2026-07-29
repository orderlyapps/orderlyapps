import { useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme-mode";
const DARK_CLASS = "ion-palette-dark";
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

function getStoredMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

function updateThemeColor(resolved: ResolvedTheme): void {
  const color = getThemeColors()[resolved];
  document.querySelectorAll('meta[name="theme-color"]').forEach((el) => {
    el.setAttribute("content", color);
  });
}

function applyTheme(mode: ThemeMode): ResolvedTheme {
  const resolved = mode === "system" ? getSystemTheme() : mode;
  document.documentElement.classList.toggle(DARK_CLASS, resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
  updateThemeColor(resolved);
  return resolved;
}

let currentMode: ThemeMode = "system";
let currentResolved: ResolvedTheme = "light";
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
  currentResolved = applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
  notify();
}

if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentMode === "system") {
      currentResolved = applyTheme("system");
      notify();
    }
  });
}

export function initTheme(): void {
  currentMode = getStoredMode();
  currentResolved = applyTheme(currentMode);
}

export interface UseThemeResult {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

export function useTheme(): UseThemeResult {
  const mode = useSyncExternalStore(subscribe, getModeSnapshot, (): ThemeMode => "system");
  const resolved = useSyncExternalStore(
    subscribe,
    getResolvedSnapshot,
    (): ResolvedTheme => "light",
  );
  return { mode, resolved, setMode: setModeInternal };
}
