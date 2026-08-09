import { expect, test } from "vite-plus/test";
import {
  createSupabaseClient,
  ProclaimerProvider,
  PublisherFilterSelect,
  PublisherList,
  PublisherPresetSelect,
  PUBLISHER_FILTER_PRESETS,
  getPreset,
  presetToFilter,
  usePublishers,
  useSupabase,
  useSupabaseOrNull,
} from "../src/index.ts";

test("package exports", () => {
  expect(typeof createSupabaseClient).toBe("function");
  expect(typeof ProclaimerProvider).toBe("function");
  expect(typeof PublisherFilterSelect).toBe("function");
  expect(typeof PublisherPresetSelect).toBe("function");
  expect(typeof PublisherList).toBe("function");
  expect(typeof usePublishers).toBe("function");
  expect(typeof useSupabase).toBe("function");
  expect(typeof useSupabaseOrNull).toBe("function");
  expect(Array.isArray(PUBLISHER_FILTER_PRESETS)).toBe(true);
  expect(typeof getPreset).toBe("function");
  expect(typeof presetToFilter).toBe("function");
});
