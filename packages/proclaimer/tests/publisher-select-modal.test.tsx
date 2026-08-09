import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { PublisherSelectModal } from "../src/feature/publishers/components/publisher-select-modal/publisher-select-modal.tsx";
import { PublisherSelectItem } from "../src/feature/publishers/components/publisher-select-modal/components/publisher-select-item/publisher-select-item.tsx";
import { PublisherSelectList } from "../src/feature/publishers/components/publisher-select-modal/components/publisher-select-list/publisher-select-list.tsx";
import type { PublisherRecord } from "../src/feature/publishers/publisher-schema.ts";
import { createMockSupabase, createWrapper, makePublisherRow } from "./mock-supabase.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("PublisherSelectModal renders the title and an item per publisher when open", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", last_name: "Lovelace" }),
    makePublisherRow({ first_name: "Bob", last_name: "Lovelace" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(
    <PublisherSelectModal
      isOpen
      title="Set Family Head"
      onDismiss={() => {}}
      onSelect={() => {}}
    />,
    { wrapper: createWrapper(supabase) },
  );

  expect(await screen.findByText("Set Family Head")).toBeTruthy();
  expect(await screen.findByText("Ada Lovelace")).toBeTruthy();
  expect(screen.getByText("Bob Lovelace")).toBeTruthy();
});

test("PublisherSelectItem calls onSelect when clicked", () => {
  const ada = makePublisherRow({ first_name: "Ada", last_name: "Lovelace" });
  const onSelect = vi.fn<(publisher: PublisherRecord) => void>();

  const { container } = render(
    <PublisherSelectItem publisher={ada} selected={false} onSelect={onSelect} />,
  );

  const item = container.querySelector("ion-item");
  expect(item).toBeTruthy();
  item!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(onSelect).toHaveBeenCalledWith(ada);
});

test("PublisherSelectItem shows a checkmark when selected", () => {
  const ada = makePublisherRow({ first_name: "Ada", last_name: "Lovelace" });

  const { container } = render(
    <PublisherSelectItem publisher={ada} selected onSelect={() => {}} />,
  );

  const icon = container.querySelector("ion-icon");
  expect(icon).toBeTruthy();
});

// --- PublisherSelectList ---

test("PublisherSelectList filters publishers by search term", async () => {
  const rows = [
    makePublisherRow({ first_name: "Ada", last_name: "Lovelace" }),
    makePublisherRow({ first_name: "Bob", last_name: "Smith" }),
  ];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherSelectList onSelect={() => {}} />, {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(screen.getByText("Ada Lovelace")).toBeTruthy());
  expect(screen.getByText("Bob Smith")).toBeTruthy();

  const searchbar = document.querySelector("ion-searchbar");
  expect(searchbar).toBeTruthy();
  searchbar!.dispatchEvent(new CustomEvent("ionInput", { detail: { value: "ada" } }));

  await waitFor(() => expect(screen.queryByText("Bob Smith")).toBeNull());
  expect(screen.getByText("Ada Lovelace")).toBeTruthy();
});

test("PublisherSelectList shows not-configured message without supabase", () => {
  const { container } = render(<PublisherSelectList onSelect={() => {}} />, {
    wrapper: createWrapper(null),
  });

  const label = container.querySelector("ion-label[color='medium']");
  expect(label).toBeTruthy();
});

test("PublisherSelectList shows no-results message when search matches nothing", async () => {
  const rows = [makePublisherRow({ first_name: "Ada", last_name: "Lovelace" })];
  const supabase = createMockSupabase({ data: rows });

  render(<PublisherSelectList onSelect={() => {}} />, {
    wrapper: createWrapper(supabase),
  });

  await waitFor(() => expect(screen.getByText("Ada Lovelace")).toBeTruthy());

  const searchbar = document.querySelector("ion-searchbar");
  searchbar!.dispatchEvent(new CustomEvent("ionInput", { detail: { value: "zzz" } }));

  await waitFor(() => expect(screen.getByText("No publishers found")).toBeTruthy());
});
