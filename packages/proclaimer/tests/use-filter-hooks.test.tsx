import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useActivePublishers } from "../src/feature/publishers/hooks/use-active-publishers.ts";
import { useArchivedPublishers } from "../src/feature/publishers/hooks/use-archived-publishers.ts";
import { usePublishersByFamily } from "../src/feature/publishers/hooks/use-publishers-by-family.ts";
import { usePublishersByGender } from "../src/feature/publishers/hooks/use-publishers-by-gender.ts";
import { usePublishersByGroup } from "../src/feature/publishers/hooks/use-publishers-by-group.ts";
import { usePublishersByStanding } from "../src/feature/publishers/hooks/use-publishers-by-standing.ts";
import { usePublishersByType } from "../src/feature/publishers/hooks/use-publishers-by-type.ts";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("useActivePublishers returns only non-archived publishers", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", archived_at: null }),
    makePublisherRow({ first_name: "Grace", archived_at: "2025-01-01T00:00:00Z" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => useActivePublishers(), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("useArchivedPublishers returns only archived publishers", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", archived_at: null }),
    makePublisherRow({ first_name: "Grace", archived_at: "2025-01-01T00:00:00Z" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => useArchivedPublishers(), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Grace" }));
});

test("usePublishersByFamily filters by family_id", async () => {
  const familyId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ first_name: "Ada", family_id: familyId }),
    makePublisherRow({ first_name: "Bob", family_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByFamily(familyId), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("usePublishersByFamily with null returns unassigned publishers", async () => {
  const familyId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ first_name: "Ada", family_id: familyId }),
    makePublisherRow({ first_name: "Bob", family_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByFamily(null), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Bob" }));
});

test("usePublishersByGender filters by gender", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", gender: "female" }),
    makePublisherRow({ first_name: "Bob", gender: "male" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByGender("male"), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Bob" }));
});

test("usePublishersByGroup filters by group_id", async () => {
  const groupId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ first_name: "Ada", group_id: groupId }),
    makePublisherRow({ first_name: "Bob", group_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByGroup(groupId), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("usePublishersByGroup with null returns unassigned publishers", async () => {
  const groupId = crypto.randomUUID();
  const rows = [
    makePublisherRow({ first_name: "Ada", group_id: groupId }),
    makePublisherRow({ first_name: "Bob", group_id: null }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByGroup(null), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Bob" }));
});

test("usePublishersByStanding filters by standing", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", standing: "elder" }),
    makePublisherRow({ first_name: "Bob", standing: "publisher" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByStanding("elder"), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});

test("usePublishersByType filters by type", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", type: "regular_pioneer" }),
    makePublisherRow({ first_name: "Bob", type: "publisher" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  const { result } = renderHook(() => usePublishersByType("regular_pioneer"), {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(result.current.data).toHaveLength(1));
  expect(result.current.data[0]).toEqual(expect.objectContaining({ first_name: "Ada" }));
});
