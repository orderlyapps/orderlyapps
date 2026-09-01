export type { FontSize } from "./types.ts";
export {
  DEFAULT_FONT_SIZE,
  FONT_SCALE_MAP,
  applyFontSize,
  getStoredFontSize,
  setStoredFontSize,
  subscribeToFontSize,
  notifyFontSizeChange,
  initFontSize,
} from "./utils.ts";
export { useFontSize } from "./hooks/use-font-size.ts";
export { FontSizeSelector } from "./font-size-selector/FontSizeSelector.tsx";
