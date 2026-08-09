import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen } from "@testing-library/react";
import { PublisherList } from "../src/feature/publishers/components/publisher-list/publisher-list.tsx";
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

  // Falls back to "first last" when display_name is null
  expect(await screen.findByText("Ada Lovelace")).toBeTruthy();
  // Renders "first (display) last" when display_name is present
  expect(await screen.findByText("Ada (Alan T.) Lovelace")).toBeTruthy();
  expect(screen.getByText("regular_pioneer")).toBeTruthy();
  expect(screen.getByText("elder")).toBeTruthy();
});
