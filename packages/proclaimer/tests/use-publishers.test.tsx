import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
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
    error: null,
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

test("populates error with a normalized Error when the query fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const supabase = createMockSupabase({ error: new Error("network down") });

  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(supabase) });

  await waitFor(() => expect(result.current.isError).toBe(true));

  expect(result.current.error).toBeInstanceOf(Error);
  expect(result.current.error?.message).toBe("network down");
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
  const { result } = renderHook(
    () => usePublishers({ filter: { column: "archived_at", op: "isNull" } }),
    {
      wrapper: createWrapper(null),
    },
  );

  expect(result.current).toEqual({
    data: [],
    isLoading: false,
    isError: false,
    error: null,
    isConfigured: false,
  });
});

test("filtered: filters rows based on the where expression", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", archived_at: null }),
    makePublisherRow({ first_name: "Grace", archived_at: "2025-01-01T00:00:00Z" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () => usePublishers({ filter: { column: "archived_at", op: "isNull" } }),
    {
      wrapper: createWrapper(supabase),
    },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("filtered: combines filters with and/or groups", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female", type: "regular_pioneer" }),
    makePublisherRow({ first_name: "Bob", gender: "male", type: "special_pioneer" }),
    makePublisherRow({ first_name: "Cy", gender: "male", type: "publisher" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        filter: {
          or: [
            { column: "gender", op: "eq", value: "female" },
            {
              and: [
                { column: "gender", op: "eq", value: "male" },
                { column: "type", op: "eq", value: "publisher" },
              ],
            },
          ],
        },
      }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(2));
  expect(result.current.data.map((p) => p.first_name).sort()).toEqual(["Ada", "Cy"]);
});

test("filtered: compares two columns with a column ref value", async () => {
  const familyId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ id: familyId, family_id: familyId, first_name: "Ada" }),
    makePublisherRow({ first_name: "Bob", family_id: crypto.randomUUID() }),
    makePublisherRow({ first_name: "Cy", family_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        filter: { column: "id", op: "eq", value: { column: "family_id" } },
      }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("filtered: re-runs when the filter changes", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female" }),
    makePublisherRow({ first_name: "Bob", gender: "male" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result, rerender } = renderHook(
    ({ gender }) => usePublishers({ filter: { column: "gender", op: "eq", value: gender } }),
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

  const { result } = renderHook(
    () => usePublishers({ filter: { column: "archived_at", op: "isNull" } }),
    {
      wrapper: createWrapper(supabase),
    },
  );

  await waitFor(() => expect(result.current.isError).toBe(true));
  expect(result.current.data).toEqual([]);
});

test("filtered: supports the ne operator", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female" }),
    makePublisherRow({ first_name: "Bob", gender: "male" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () => usePublishers({ filter: { column: "gender", op: "ne", value: "female" } }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Bob" }));
});

test("filtered: supports the in operator", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", type: "regular_pioneer" }),
    makePublisherRow({ first_name: "Bob", type: "special_pioneer" }),
    makePublisherRow({ first_name: "Cy", type: "publisher" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        filter: { column: "type", op: "in", value: ["regular_pioneer", "special_pioneer"] },
      }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(2));
  expect(result.current.data.map((p) => p.first_name).sort()).toEqual(["Ada", "Bob"]);
});

test("filtered: supports like and ilike operators", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada" }),
    makePublisherRow({ first_name: "alan" }),
    makePublisherRow({ first_name: "Bob" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        filter: [
          { column: "first_name", op: "ilike", value: "a%" },
          { column: "first_name", op: "like", value: "A%" },
        ],
      }),
    { wrapper: createWrapper(supabase) },
  );

  // ilike matches both Ada and alan, like is case-sensitive and keeps only Ada
  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("filtered: supports the isNotNull operator", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", archived_at: null }),
    makePublisherRow({ first_name: "Grace", archived_at: "2025-01-01T00:00:00Z" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () => usePublishers({ filter: { column: "archived_at", op: "isNotNull" } }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Grace" }));
});

test("filtered: an empty filter array returns all rows", async () => {
  const rows = [makePublisherRow({ first_name: "Ada" }), makePublisherRow({ first_name: "Bob" })];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers({ filter: [] }), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(2));
});

test("filtered: an empty group is pruned and returns all rows", async () => {
  const rows = [makePublisherRow({ first_name: "Ada" }), makePublisherRow({ first_name: "Bob" })];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers({ filter: { and: [] } }), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(2));
});

test("filtered: supports groups nested three levels deep", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female", type: "regular_pioneer" }),
    makePublisherRow({ first_name: "Bob", gender: "male", type: "special_pioneer" }),
    makePublisherRow({ first_name: "Cy", gender: "male", type: "publisher" }),
    makePublisherRow({ first_name: "Di", gender: "female", type: "publisher" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        filter: {
          or: [
            {
              and: [
                {
                  or: [
                    { column: "type", op: "eq", value: "special_pioneer" },
                    { column: "type", op: "eq", value: "publisher" },
                  ],
                },
                { column: "gender", op: "eq", value: "male" },
              ],
            },
            {
              and: [
                { column: "gender", op: "eq", value: "female" },
                { column: "type", op: "eq", value: "regular_pioneer" },
              ],
            },
          ],
        },
      }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(3));
  expect(result.current.data.map((p) => p.first_name).sort()).toEqual(["Ada", "Bob", "Cy"]);
});

test("filtered: an in operator with an empty array matches nothing", async () => {
  const rows = [makePublisherRow({ first_name: "Ada" }), makePublisherRow({ first_name: "Bob" })];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () => usePublishers({ filter: { column: "type", op: "in", value: [] } }),
    { wrapper: createWrapper(supabase) },
  );

  // Give the live query a chance to populate before asserting emptiness
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([]);
});

// --- Enabled ---

test("enabled: returns an idle result without subscribing when enabled is false", async () => {
  const rows = [makePublisherRow({ first_name: "Ada" })];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers({ enabled: false }), {
    wrapper: createWrapper(supabase),
  });

  expect(result.current).toEqual({
    data: [],
    isLoading: false,
    isError: false,
    error: null,
    isConfigured: true,
  });
});

test("enabled: subscribes when enabled flips to true", async () => {
  const rows = [makePublisherRow({ first_name: "Ada" })];
  const supabase = createMockSupabase({ data: rows });

  const { result, rerender } = renderHook(({ enabled }) => usePublishers({ enabled }), {
    wrapper: createWrapper(supabase),
    initialProps: { enabled: false },
  });

  expect(result.current.data).toEqual([]);

  rerender({ enabled: true });
  await waitFor(() => expect(result.current.data).toHaveLength(1));
});

// --- Ordered ---

test("ordered: sorts by multiple columns with directions", async () => {
  const rows = [
    makePublisherRow({ first_name: "Bob", last_name: "Smith" }),
    makePublisherRow({ first_name: "Ada", last_name: "Smith" }),
    makePublisherRow({ first_name: "Cy", last_name: "Jones" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        orderBy: [
          { column: "last_name", direction: "asc" },
          { column: "first_name", direction: "desc" },
        ],
      }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(3));
  expect(result.current.data.map((p) => p.first_name)).toEqual(["Cy", "Bob", "Ada"]);
});

test("ordered: orderBy entries default to ascending direction", async () => {
  const rows = [
    makePublisherRow({ first_name: "Bob", last_name: "Smith" }),
    makePublisherRow({ first_name: "Ada", last_name: "Jones" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers({ orderBy: [{ column: "last_name" }] }), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(2));
  expect(result.current.data.map((p) => p.last_name)).toEqual(["Jones", "Smith"]);
});

test("ordered: combines filter and orderBy in the same query", async () => {
  const rows = [
    makePublisherRow({ first_name: "Bob", last_name: "Smith", gender: "male" }),
    makePublisherRow({ first_name: "Ada", last_name: "Jones", gender: "female" }),
    makePublisherRow({ first_name: "Cy", last_name: "Adams", gender: "male" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(
    () =>
      usePublishers({
        filter: { column: "gender", op: "eq", value: "male" },
        orderBy: [{ column: "last_name" }],
      }),
    { wrapper: createWrapper(supabase) },
  );

  await waitFor(() => expect(result.current.data).toHaveLength(2));
  expect(result.current.data.map((p) => p.first_name)).toEqual(["Cy", "Bob"]);
});

test("ordered: defaults to last_name, display_name, first_name when orderBy is omitted", async () => {
  const rows = [
    makePublisherRow({ first_name: "Cy", display_name: "Al", last_name: "Smith" }),
    makePublisherRow({ first_name: "Zoe", display_name: null, last_name: "Adams" }),
    makePublisherRow({ first_name: "Bob", display_name: "Al", last_name: "Smith" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishers(), { wrapper: createWrapper(supabase) });

  await waitFor(() => expect(result.current.data).toHaveLength(3));
  expect(result.current.data.map((p) => p.first_name)).toEqual(["Zoe", "Bob", "Cy"]);
});
