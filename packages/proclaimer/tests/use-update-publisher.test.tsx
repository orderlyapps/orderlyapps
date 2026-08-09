import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useUpdatePublisher } from "../src/feature/publishers/hooks/use-update-publisher.ts";
import { usePublishers } from "../src/feature/publishers/hooks/use-publishers.ts";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("useUpdatePublisher no-ops when supabase is not configured", () => {
  const { result } = renderHook(() => useUpdatePublisher(), {
    wrapper: createWrapper(null),
  });

  expect(result.current.isConfigured).toBe(false);
  expect(() => result.current.update("any-id", { family_id: null })).not.toThrow();
});

test("useUpdatePublisher reports isConfigured true when supabase is available", () => {
  const supabase = createMockSupabase({ data: [] });
  const { result } = renderHook(() => useUpdatePublisher(), {
    wrapper: createWrapper(supabase),
  });

  expect(result.current.isConfigured).toBe(true);
});

test("useUpdatePublisher triggers onUpdate with the correct payload and strips id", async () => {
  const publisher = makePublisherRow({ first_name: "Ada", family_id: null });
  const newFamilyId = crypto.randomUUID();
  const onUpdate = vi.fn<(payload: Record<string, unknown>, id: string) => void>();
  const supabase = createMockSupabase({ data: [publisher], onUpdate });

  const wrapper = createWrapper(supabase);

  // Render both hooks so the collection is initialized and the live query
  // has loaded the publisher before we attempt an update.
  const { result: publishersResult } = renderHook(() => usePublishers(), { wrapper });
  const { result: updateResult } = renderHook(() => useUpdatePublisher(), { wrapper });

  await waitFor(() => expect(publishersResult.current.data).toHaveLength(1));

  updateResult.current.update(publisher.id, { family_id: newFamilyId });

  await waitFor(() => expect(onUpdate).toHaveBeenCalled());
  const [payload, id] = onUpdate.mock.calls[0];
  expect(id).toBe(publisher.id);
  expect(payload).toEqual({ family_id: newFamilyId });
  expect(payload).not.toHaveProperty("id");
});

test("onUpdate skips persistence when only the id field changes", async () => {
  const publisher = makePublisherRow({ first_name: "Ada" });
  const onUpdate = vi.fn<(payload: Record<string, unknown>, id: string) => void>();
  const supabase = createMockSupabase({ data: [publisher], onUpdate });

  const wrapper = createWrapper(supabase);
  const { result: publishersResult } = renderHook(() => usePublishers(), { wrapper });
  const { result: updateResult } = renderHook(() => useUpdatePublisher(), { wrapper });

  await waitFor(() => expect(publishersResult.current.data).toHaveLength(1));

  // An update that only sets id (which gets stripped) should not call supabase
  updateResult.current.update(publisher.id, { id: publisher.id } as never);

  // Give the async onUpdate a chance to run
  await waitFor(() => expect(publishersResult.current.isLoading).toBe(false));
  expect(onUpdate).not.toHaveBeenCalled();
});
