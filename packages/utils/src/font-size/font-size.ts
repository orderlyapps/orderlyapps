import type { FontSize } from "./types.ts";

export const FONT_SCALE_MAP: Record<FontSize, number> = {
  xs: 0.85,
  sm: 0.925,
  md: 1,
  lg: 1.1,
  xl: 1.2,
  "2xl": 1.3,
};

export const DEFAULT_FONT_SIZE: FontSize = "md";

const STORAGE_KEY = "font_size";
const FONT_SIZE_OPTIONS = Object.keys(FONT_SCALE_MAP) as readonly FontSize[];

type Listener = () => void;

let currentFontSize: FontSize = DEFAULT_FONT_SIZE;
const listeners = new Set<Listener>();

export function isValidFontSize(value: string): value is FontSize {
  return FONT_SIZE_OPTIONS.includes(value as FontSize);
}

export function getStoredFontSize(): FontSize | null {
  if (typeof localStorage === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isValidFontSize(stored)) return stored;
  return null;
}

function applyFontSize(size: FontSize): void {
  if (typeof document === "undefined") return;
  const scale = FONT_SCALE_MAP[size];
  document.documentElement.style.setProperty("--app-font-scale", String(scale));
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getFontSizeSnapshot(): FontSize {
  return currentFontSize;
}

function notify(): void {
  listeners.forEach((l) => l());
}

export function setFontSize(next: FontSize): void {
  if (next === currentFontSize) return;
  currentFontSize = next;
  applyFontSize(next);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, next);
  }
  notify();
}

export function initFontSize(): void {
  const stored = getStoredFontSize();
  currentFontSize = stored ?? DEFAULT_FONT_SIZE;
  applyFontSize(currentFontSize);
}

export { subscribe, getFontSizeSnapshot };
