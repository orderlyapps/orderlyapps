import { expect, test } from "vite-plus/test";
import { formatPublisherName } from "../src/feature/publishers/components/publisher-name/publisher-name.tsx";
import { makePublisherRow } from "./mock-supabase.tsx";

test("display_name null with default format falls back to first_name last_name", () => {
  const row = makePublisherRow({ display_name: null });
  expect(formatPublisherName(row)).toBe("Ada Lovelace");
});

test("display_name present with default format renders display_name last_name", () => {
  const row = makePublisherRow({ display_name: "Ace" });
  expect(formatPublisherName(row)).toBe("Ace Lovelace");
});

test("first_name (display_name) middle_name last_name with distinct display_name", () => {
  const row = makePublisherRow({ display_name: "Ace", middle_name: "Byron" });
  expect(formatPublisherName(row, "first_name (display_name) middle_name last_name")).toBe(
    "Ada (Ace) Byron Lovelace",
  );
});

test("first_name (display_name) middle_name last_name dedups when display_name equals first_name", () => {
  const row = makePublisherRow({ display_name: "Ada" });
  expect(formatPublisherName(row, "first_name (display_name) middle_name last_name")).toBe(
    "Ada Lovelace",
  );
});

test("first_name (display_name) middle_name last_name dedups when display_name equals middle_name", () => {
  const row = makePublisherRow({ display_name: "Byron", middle_name: "Byron" });
  expect(formatPublisherName(row, "first_name (display_name) middle_name last_name")).toBe(
    "Ada Byron Lovelace",
  );
});

test("first_name (display_name) middle_name last_name with null display_name dedups via first_name fallback", () => {
  const row = makePublisherRow({ display_name: null });
  expect(formatPublisherName(row, "first_name (display_name) middle_name last_name")).toBe(
    "Ada Lovelace",
  );
});

test("first_name (display_name) middle_name last_name with null middle_name collapses whitespace", () => {
  const row = makePublisherRow({ display_name: "Ace", middle_name: null });
  expect(formatPublisherName(row, "first_name (display_name) middle_name last_name")).toBe(
    "Ada (Ace) Lovelace",
  );
});

test("last_name, display_name format", () => {
  const row = makePublisherRow({ display_name: "Ace" });
  expect(formatPublisherName(row, "last_name, display_name")).toBe("Lovelace, Ace");
});

test("last_name, display_name format with null display_name falls back to first_name", () => {
  const row = makePublisherRow({ display_name: null });
  expect(formatPublisherName(row, "last_name, display_name")).toBe("Lovelace, Ada");
});

test("first_name last_name format", () => {
  const row = makePublisherRow({ display_name: "Ace", middle_name: "Byron" });
  expect(formatPublisherName(row, "first_name last_name")).toBe("Ada Lovelace");
});
