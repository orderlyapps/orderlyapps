import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { FamilyDetailRow } from "../src/feature/publishers/components/publisher-details/components/family-detail-row/family-detail-row.tsx";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("FamilyDetailRow renders the family_id value or dash when null", () => {
  const publisher = makePublisherRow({ family_id: null });

  const { container } = render(<FamilyDetailRow publisher={publisher} />, {
    wrapper: createWrapper(null),
  });

  const items = container.querySelectorAll("ion-item");
  expect(items.length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText("Family")).toBeTruthy();
  expect(screen.getByText("—")).toBeTruthy();
});

test("FamilyDetailRow opens the select modal when clicked", async () => {
  const publisher = makePublisherRow({ family_id: null });
  const supabase = createMockSupabase({ data: [publisher] });

  const { container } = render(<FamilyDetailRow publisher={publisher} />, {
    wrapper: createWrapper(supabase),
  });

  const item = container.querySelector("ion-item");
  expect(item).toBeTruthy();
  item!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  await waitFor(() => expect(screen.getByText("Set Family Head")).toBeTruthy());
});

test("FamilyDetailRow calls updatePublisher with the selected family head id", async () => {
  const publisher = makePublisherRow({ first_name: "Ada", family_id: null });
  const head = makePublisherRow({ first_name: "Bob", last_name: "Smith" });
  const onUpdate = vi.fn<(payload: Record<string, unknown>, id: string) => void>();
  const supabase = createMockSupabase({ data: [publisher, head], onUpdate });

  const { container } = render(<FamilyDetailRow publisher={publisher} />, {
    wrapper: createWrapper(supabase),
  });

  // Open the modal
  const item = container.querySelector("ion-item");
  item!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  // Wait for the list to render, then click Bob
  await waitFor(() => expect(screen.getByText("Smith, Bob")).toBeTruthy());
  const bobItem = Array.from(document.querySelectorAll("ion-item")).find((el) =>
    el.textContent?.includes("Smith, Bob"),
  );
  expect(bobItem).toBeTruthy();
  bobItem!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  await waitFor(() => expect(onUpdate).toHaveBeenCalled());
  const [payload, id] = onUpdate.mock.calls[0];
  expect(id).toBe(publisher.id);
  expect(payload).toEqual({ family_id: head.id });
});
