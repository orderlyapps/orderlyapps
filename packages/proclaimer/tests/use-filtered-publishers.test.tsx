import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { eq, isNull } from "@tanstack/react-db";
import { useFilteredPublishers } from "../src/feature/publishers/hooks/use-filtered-publishers.ts";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("returns a not-configured, idle result when there is no supabase client", () => {
  const { result } = renderHook(() => useFilteredPublishers((p) => isNull(p.archived_at), []), {
    wrapper: createWrapper(null),
  });

  expect(result.current).toEqual({
    data: [],
    isLoading: false,
    isError: false,
    isConfigured: false,
  });
});

test("filters rows based on the where expression", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", archived_at: null }),
    makePublisherRow({ first_name: "Grace", archived_at: "2025-01-01T00:00:00Z" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => useFilteredPublishers((p) => isNull(p.archived_at), []), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("re-runs when deps change", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female" }),
    makePublisherRow({ first_name: "Bob", gender: "male" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result, rerender } = renderHook(
    ({ gender }) => useFilteredPublishers((p) => eq(p.gender, gender), [gender]),
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

test("exposes isError when the query fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const supabase = createMockSupabase({ error: new Error("network down") });

  const { result } = renderHook(() => useFilteredPublishers((p) => isNull(p.archived_at), []), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.isError).toBe(true));
  expect(result.current.data).toEqual([]);
});
