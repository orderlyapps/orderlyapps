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

test("useUpdatePublisher triggers onUpdate with the modified row", async () => {
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
  // The database collection sends the full modified row (mutation.modified),
  // not just the changed fields.
  expect(payload).toMatchObject({ family_id: newFamilyId, first_name: "Ada" });
});

test("onError fires with a normalized Error when the update fails", async () => {
  const publisher = makePublisherRow({ first_name: "Ada" });
  const onError = vi.fn<(error: Error) => void>();
  const supabase = createMockSupabase({
    data: [publisher],
    updateError: new Error("permission denied"),
  });

  const wrapper = createWrapper(supabase);
  const { result: publishersResult } = renderHook(() => usePublishers(), { wrapper });
  const { result: updateResult } = renderHook(() => useUpdatePublisher({ onError }), { wrapper });

  await waitFor(() => expect(publishersResult.current.data).toHaveLength(1));

  updateResult.current.update(publisher.id, { first_name: "Grace" });

  await waitFor(() => expect(onError).toHaveBeenCalled());
  const [error] = onError.mock.calls[0];
  expect(error).toBeInstanceOf(Error);
  expect(error.message).toBe("permission denied");
});
