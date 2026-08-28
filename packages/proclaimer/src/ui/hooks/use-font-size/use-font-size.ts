import { useEffect, useState } from "react";
import type { Size } from "../../types/size.ts";

export type FontSize = Size;

const FONT_SIZE_VALUES: readonly FontSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
const FONT_SIZE_KEY = "font_size";
const DEFAULT_FONT_SIZE: FontSize = "md";

const FONT_SCALE_MAP: Record<FontSize, number> = {
  xs: 0.85,
  sm: 0.925,
  md: 1,
  lg: 1.1,
  xl: 1.2,
  "2xl": 1.3,
};

type Listener = (size: FontSize) => void;
const listeners: Listener[] = [];

function subscribeToFontSize(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

function getStoredFontSize(): FontSize | null {
  const stored = localStorage.getItem(FONT_SIZE_KEY);
  if (stored && (FONT_SIZE_VALUES as readonly string[]).includes(stored)) {
    return stored as FontSize;
  }
  return null;
}

function applyFontSize(size: FontSize): void {
  const scale = FONT_SCALE_MAP[size];
  document.documentElement.style.setProperty("--app-font-scale", String(scale));
}

function setStoredFontSize(size: FontSize): void {
  localStorage.setItem(FONT_SIZE_KEY, size);
  listeners.forEach((listener) => listener(size));
}

export function useFontSize() {
  const [font_size, set_font_size] = useState<FontSize>(
    () => getStoredFontSize() ?? DEFAULT_FONT_SIZE,
  );

  useEffect(() => {
    const unsubscribe = subscribeToFontSize((new_size) => {
      set_font_size(new_size);
      applyFontSize(new_size);
    });
    function syncFromStorage() {
      const stored = getStoredFontSize() ?? DEFAULT_FONT_SIZE;
      set_font_size(stored);
      applyFontSize(stored);
    }
    window.addEventListener("font-size-change", syncFromStorage);
    return () => {
      unsubscribe();
      window.removeEventListener("font-size-change", syncFromStorage);
    };
  }, []);

  const setFontSize = (size: FontSize) => {
    setStoredFontSize(size);
    set_font_size(size);
    applyFontSize(size);
  };

  return {
    font_size,
    setFontSize,
  };
}
