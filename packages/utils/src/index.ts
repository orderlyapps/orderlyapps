export type { Size } from "./types/size.ts";
export type { FontSize } from "./font-size/types.ts";

export {
  FONT_SCALE_MAP,
  DEFAULT_FONT_SIZE,
  isValidFontSize,
  getStoredFontSize,
  initFontSize,
} from "./font-size/font-size.ts";

export { useFontSize, type UseFontSizeResult } from "./font-size/use-font-size.ts";
