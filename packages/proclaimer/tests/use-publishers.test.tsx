import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { eq, isNull } from "@tanstack/react-db";
import { usePublishers } from "../src/feature/publishers/hooks/use-publishers.ts";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// --- Unfiltered ---

test("returns a not-configured, idle result when there is no supabase client", () => {
  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(null) });

  expect(result.current).toEqual({
    data: [],
    isLoading: false,
    isError: false,
    isConfigured: false,
  });
});

test("maps rows returned from supabase into publisher records", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", last_name: "Lovelace" }),
    makePublisherRow({ first_name: "Grace", last_name: "Hopper", type: "special_pioneer" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(supabase) });

  await waitFor(() => expect(result.current.data).toHaveLength(2));

  expect(result.current.isConfigured).toBe(true);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(false);
  // Collection entries carry internal $-prefixed sync metadata alongside the
  // schema fields, so match on the publisher fields only
  expect(result.current.data).toEqual(
    expect.arrayContaining(rows.map((row) => expect.objectContaining(row))),
  );
});

test("exposes isError when the query fails", async () => {
  // The query collection logs observed query errors
  vi.spyOn(console, "error").mockImplementation(() => {});
  const supabase = createMockSupabase({ error: new Error("network down") });

  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(supabase) });

  await waitFor(() => expect(result.current.isError).toBe(true));

  expect(result.current.isLoading).toBe(false);
  expect(result.current.data).toEqual([]);
});

test("includes publishers with a non-null archived_at", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", last_name: "Lovelace" }),
    makePublisherRow({
      first_name: "Grace",
      last_name: "Hopper",
      archived_at: "2025-01-01T00:00:00Z",
    }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(supabase) });

  await waitFor(() => expect(result.current.data).toHaveLength(2));

  expect(result.current.data).toEqual(
    expect.arrayContaining(rows.map((row) => expect.objectContaining(row))),
  );
});

test("surfaces a schema validation failure as an error", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const supabase = createMockSupabase({ data: [{ id: "not-a-uuid", first_name: "Bad" }] });

  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(supabase) });

  await waitFor(() => expect(result.current.isError).toBe(true));

  expect(result.current.data).toEqual([]);
});

// --- Filtered ---

test("filtered: returns a not-configured, idle result when there is no supabase client", () => {
  const { result } = renderHook(() => usePublishers((p) => isNull(p.archived_at), []), {
    wrapper: createWrapper(null),
  });

  expect(result.current).toEqual({
    data: [],
    isLoading: false,
    isError: false,
    isConfigured: false,
  });
});

test("filtered: filters rows based on the where expression", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", archived_at: null }),
    makePublisherRow({ first_name: "Grace", archived_at: "2025-01-01T00:00:00Z" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers((p) => isNull(p.archived_at), []), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("filtered: re-runs when deps change", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female" }),
    makePublisherRow({ first_name: "Bob", gender: "male" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result, rerender } = renderHook(
    ({ gender }) => usePublishers((p) => eq(p.gender, gender), [gender]),
    {
      wrapper: createWrapper(supabase),
      initialProps: { gender: "female" as "female" | "male" },
    },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));

  rerender({ gender: "male" });
  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Bob" }));
});

test("filtered: exposes isError when the query fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const supabase = createMockSupabase({ error: new Error("network down") });

  const { result } = renderHook(() => usePublishers((p) => isNull(p.archived_at), []), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.isError).toBe(true));
  expect(result.current.data).toEqual([]);
});
