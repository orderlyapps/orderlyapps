import { expect, test } from "vite-plus/test";
import {
  PUBLISHER_FILTER_PRESETS,
  getPreset,
  presetToFilter,
} from "../src/feature/publishers/publisher-filter-presets.ts";

test("exposes built-in presets with stable ids and labels", () => {
  const ids = PUBLISHER_FILTER_PRESETS.map((p) => p.id);
  expect(ids).toEqual(["family_heads", "family_members", "no_family"]);
  for (const preset of PUBLISHER_FILTER_PRESETS) {
    expect(typeof preset.label).toBe("string");
    expect(preset.label.length).toBeGreaterThan(0);
  }
});

test("family_heads preset compares id against family_id via a column ref", () => {
  const preset = getPreset("family_heads");
  expect(preset).toBeDefined();
  expect(preset?.filter).toEqual({
    column: "id",
    op: "eq",
    value: { column: "family_id" },
  });
});

test("family_members preset matches non-null family_id that differs from id", () => {
  const preset = getPreset("family_members");
  expect(preset).toBeDefined();
  expect(preset?.filter).toEqual({
    and: [
      { column: "family_id", op: "isNotNull" },
      { column: "family_id", op: "ne", value: { column: "id" } },
    ],
  });
});

test("no_family preset matches a null family_id", () => {
  const preset = getPreset("no_family");
  expect(preset).toBeDefined();
  expect(preset?.filter).toEqual({ column: "family_id", op: "isNull" });
});

test("getPreset returns undefined for an unknown id", () => {
  expect(getPreset("does_not_exist")).toBeUndefined();
});

test("presetToFilter resolves a known id to its filter and undefined otherwise", () => {
  expect(presetToFilter("family_heads")).toEqual({
    column: "id",
    op: "eq",
    value: { column: "family_id" },
  });
  expect(presetToFilter("all")).toBeUndefined();
  expect(presetToFilter("unknown")).toBeUndefined();
});
