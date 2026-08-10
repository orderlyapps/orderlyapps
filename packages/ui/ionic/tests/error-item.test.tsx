import { expect, test, afterEach } from "vite-plus/test";
import { cleanup, render } from "@testing-library/react";
import { ErrorItem } from "../src/components/error-item/error-item.tsx";

afterEach(() => {
  cleanup();
});

test("ErrorItem renders the message text", () => {
  const { container } = render(<ErrorItem message="Something went wrong" />);
  const label = container.querySelector("ion-label");
  expect(label).toBeTruthy();
  expect(label?.innerHTML).toContain("Something went wrong");
});

test("ErrorItem renders with danger color", () => {
  const { container } = render(<ErrorItem message="boom" />);
  const item = container.querySelector("ion-item");
  expect(item).toBeTruthy();
  expect(item?.getAttribute("color")).toBe("danger");
});
