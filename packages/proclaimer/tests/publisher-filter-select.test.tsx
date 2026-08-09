import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, render, screen } from "@testing-library/react";
import { PublisherFilterSelect } from "../src/feature/publishers/components/publisher-filter-select/publisher-filter-select.tsx";
import type { PublisherTypeFilter } from "../src/feature/publishers/components/publisher-filter-select/publisher-filter-select.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("renders a select with all publisher type options", () => {
  render(<PublisherFilterSelect value="all" onChange={() => {}} />);

  expect(screen.getByText("All Publishers")).toBeTruthy();
  expect(screen.getByText("Publisher")).toBeTruthy();
  expect(screen.getByText("Regular Pioneer")).toBeTruthy();
  expect(screen.getByText("Special Pioneer")).toBeTruthy();
  expect(screen.getByText("Continuous Auxiliary")).toBeTruthy();
  expect(screen.getByText("Inactive")).toBeTruthy();
  expect(screen.getByText("Speaker")).toBeTruthy();
  expect(screen.getByText("Associate")).toBeTruthy();
  expect(screen.getByText("Circuit Overseer")).toBeTruthy();
});

test("calls onChange with the selected value", () => {
  const onChange = vi.fn<(value: PublisherTypeFilter) => void>();
  const { container } = render(<PublisherFilterSelect value="all" onChange={onChange} />);

  const ionSelect = container.querySelector("ion-select");
  expect(ionSelect).toBeTruthy();

  ionSelect!.dispatchEvent(new CustomEvent("ionChange", { detail: { value: "regular_pioneer" } }));

  expect(onChange).toHaveBeenCalledWith("regular_pioneer");
});
