import { expect, test } from "vite-plus/test";
import { DEFAULT_FONT_SIZE, FONT_SCALE_MAP, isValidFontSize } from "../src/index.ts";

test("FONT_SCALE_MAP has all sizes", () => {
  expect(FONT_SCALE_MAP.xs).toBe(0.85);
  expect(FONT_SCALE_MAP.sm).toBe(0.925);
  expect(FONT_SCALE_MAP.md).toBe(1);
  expect(FONT_SCALE_MAP.lg).toBe(1.1);
  expect(FONT_SCALE_MAP.xl).toBe(1.2);
  expect(FONT_SCALE_MAP["2xl"]).toBe(1.3);
});

test("isValidFontSize validates allowed values", () => {
  expect(isValidFontSize("md")).toBe(true);
  expect(isValidFontSize("invalid")).toBe(false);
});

test("DEFAULT_FONT_SIZE is md", () => {
  expect(DEFAULT_FONT_SIZE).toBe("md");
});
