import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen } from "@testing-library/react";
import { PublisherList } from "../src/feature/publishers/components/publisher-list/publisher-list.tsx";
import { presetToFilter } from "../src/feature/publishers/publisher-filter-presets.ts";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("renders the not-configured state when there is no supabase client", async () => {
  render(<PublisherList />, { wrapper: createWrapper(null) });

  expect(await screen.findByText(/Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY/)).toBeTruthy();
});

test("renders the error state when the publishers query fails", async () => {
  // The query collection logs observed query errors
  vi.spyOn(console, "error").mockImplementation(() => {});
  const supabase = createMockSupabase({ error: new Error("boom") });

  render(<PublisherList />, { wrapper: createWrapper(supabase) });

  expect(await screen.findByText("Failed to load publishers")).toBeTruthy();
});

test("renders the empty state when no publishers are returned", async () => {
  const supabase = createMockSupabase({ data: [] });

  render(<PublisherList />, { wrapper: createWrapper(supabase) });

  expect(await screen.findByText("No publishers found")).toBeTruthy();
});

test("renders an item per publisher row", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", last_name: "Lovelace", type: "regular_pioneer" }),
    makePublisherRow({ display_name: "Alan T.", standing: "elder" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherList />, { wrapper: createWrapper(supabase) });

  // Falls back to "last, first" when display_name is null
  expect(await screen.findByText("Lovelace, Ada")).toBeTruthy();
  // Renders "last, display" when display_name is present
  expect(await screen.findByText("Lovelace, Alan T.")).toBeTruthy();
  expect(screen.getByText("regular_pioneer")).toBeTruthy();
  expect(screen.getByText("elder")).toBeTruthy();
});

// --- Filtered ---

test("renders only publishers matching the filter prop", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", type: "regular_pioneer" }),
    makePublisherRow({ first_name: "Bob", type: "special_pioneer" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherList filter={{ column: "type", op: "eq", value: "regular_pioneer" }} />, {
    wrapper: createWrapper(supabase),
  });

  expect(await screen.findByText("Lovelace, Ada")).toBeTruthy();
  expect(screen.queryByText("Lovelace, Bob")).toBeNull();
});

test("renders only publishers matching an array of filter nodes", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", type: "regular_pioneer", gender: "female" }),
    makePublisherRow({ first_name: "Bob", type: "regular_pioneer", gender: "male" }),
    makePublisherRow({ first_name: "Cy", type: "special_pioneer", gender: "female" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(
    <PublisherList
      filter={[
        { column: "type", op: "eq", value: "regular_pioneer" },
        { column: "gender", op: "eq", value: "female" },
      ]}
    />,
    { wrapper: createWrapper(supabase) },
  );

  expect(await screen.findByText("Lovelace, Ada")).toBeTruthy();
  expect(screen.queryByText("Lovelace, Bob")).toBeNull();
  expect(screen.queryByText("Lovelace, Cy")).toBeNull();
});

test("renders the empty state when the filter matches no publishers", async () => {
  const rows = [makePublisherRow({ first_name: "Ada", type: "publisher" })];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherList filter={{ column: "type", op: "eq", value: "special_pioneer" }} />, {
    wrapper: createWrapper(supabase),
  });

  expect(await screen.findByText("No publishers found")).toBeTruthy();
});

test("re-renders with updated results when the filter prop changes", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", type: "regular_pioneer" }),
    makePublisherRow({ first_name: "Bob", type: "special_pioneer" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { rerender } = render(
    <PublisherList filter={{ column: "type", op: "eq", value: "regular_pioneer" }} />,
    { wrapper: createWrapper(supabase) },
  );

  expect(await screen.findByText("Lovelace, Ada")).toBeTruthy();
  expect(screen.queryByText("Lovelace, Bob")).toBeNull();

  rerender(<PublisherList filter={{ column: "type", op: "eq", value: "special_pioneer" }} />);

  expect(await screen.findByText("Lovelace, Bob")).toBeTruthy();
  expect(screen.queryByText("Lovelace, Ada")).toBeNull();
});

// --- Preset-driven ---

test("renders only family heads when given the family_heads preset filter", async () => {
  const familyId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ id: familyId, family_id: familyId, first_name: "Ada" }),
    makePublisherRow({ first_name: "Bob", family_id: crypto.randomUUID() }),
    makePublisherRow({ first_name: "Cy", family_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherList filter={presetToFilter("family_heads")} />, {
    wrapper: createWrapper(supabase),
  });

  expect(await screen.findByText("Lovelace, Ada")).toBeTruthy();
  expect(screen.queryByText("Lovelace, Bob")).toBeNull();
  expect(screen.queryByText("Lovelace, Cy")).toBeNull();
});

test("renders publishers with no family when given the no_family preset filter", async () => {
  const familyId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ id: familyId, family_id: familyId, first_name: "Ada" }),
    makePublisherRow({ first_name: "Bob", family_id: crypto.randomUUID() }),
    makePublisherRow({ first_name: "Cy", family_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherList filter={presetToFilter("no_family")} />, {
    wrapper: createWrapper(supabase),
  });

  expect(await screen.findByText("Lovelace, Cy")).toBeTruthy();
  expect(screen.queryByText("Lovelace, Ada")).toBeNull();
  expect(screen.queryByText("Lovelace, Bob")).toBeNull();
});
