import { useSyncExternalStore } from "react";

import { DEFAULT_FONT_SIZE, getFontSizeSnapshot, setFontSize, subscribe } from "./font-size.ts";
import type { FontSize } from "./types.ts";

export interface UseFontSizeResult {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export function useFontSize(): UseFontSizeResult {
  const fontSize = useSyncExternalStore(
    subscribe,
    getFontSizeSnapshot,
    (): FontSize => DEFAULT_FONT_SIZE,
  );

  return { fontSize, setFontSize };
}
