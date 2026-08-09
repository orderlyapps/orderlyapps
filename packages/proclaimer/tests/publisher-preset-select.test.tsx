import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen } from "@testing-library/react";
import { PublisherPresetSelect } from "../src/feature/publishers/components/publisher-preset-select/publisher-preset-select.tsx";
import type { PublisherPresetFilter } from "../src/feature/publishers/components/publisher-preset-select/publisher-preset-select.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("renders a select with 'All Publishers' and the built-in preset labels", () => {
  render(<PublisherPresetSelect value="all" onChange={() => {}} />);

  expect(screen.getByText("All Publishers")).toBeTruthy();
  expect(screen.getByText("Family Heads")).toBeTruthy();
  expect(screen.getByText("Family Members")).toBeTruthy();
  expect(screen.getByText("No Family")).toBeTruthy();
});

test("calls onChange with the selected preset id", () => {
  const onChange = vi.fn<(value: PublisherPresetFilter) => void>();
  const { container } = render(<PublisherPresetSelect value="all" onChange={onChange} />);

  const ionSelect = container.querySelector("ion-select");
  expect(ionSelect).toBeTruthy();

  ionSelect!.dispatchEvent(new CustomEvent("ionChange", { detail: { value: "family_heads" } }));

  expect(onChange).toHaveBeenCalledWith("family_heads");
});
