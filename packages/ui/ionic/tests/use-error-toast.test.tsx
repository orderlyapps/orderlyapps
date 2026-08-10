import { expect, test, afterEach, vi } from "vite-plus/test";
import { cleanup, renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { useErrorToast } from "../src/components/error-toast/use-error-toast.ts";

const { mockPresent } = vi.hoisted(() => ({ mockPresent: vi.fn() }));

vi.mock("@ionic/react", async (original) => {
  const actual = await original<typeof import("@ionic/react")>();
  return { ...actual, useIonToast: () => [mockPresent] };
});

afterEach(() => {
  cleanup();
  mockPresent.mockReset();
});

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <>{children}</>;
  };
}

test("presentError calls useIonToast with danger color and the described message", () => {
  const { result } = renderHook(() => useErrorToast(), { wrapper: createWrapper() });

  act(() => {
    result.current.presentError(new Error("kaboom"));
  });

  expect(mockPresent).toHaveBeenCalledTimes(1);
  const [opts] = mockPresent.mock.calls[0];
  expect(opts.message).toBe("kaboom");
  expect(opts.color).toBe("danger");
  expect(opts.duration).toBe(4000);
});

test("presentError uses the custom describeError function", () => {
  const describeError = (err: unknown) => `Custom: ${String(err)}`;
  const { result } = renderHook(() => useErrorToast({ describeError }), {
    wrapper: createWrapper(),
  });

  act(() => {
    result.current.presentError("oops");
  });

  expect(mockPresent).toHaveBeenCalledTimes(1);
  expect(mockPresent.mock.calls[0][0].message).toBe("Custom: oops");
});

test("presentError respects custom duration", () => {
  const { result } = renderHook(() => useErrorToast({ duration: 2000 }), {
    wrapper: createWrapper(),
  });

  act(() => {
    result.current.presentError(new Error("fail"));
  });

  expect(mockPresent.mock.calls[0][0].duration).toBe(2000);
});

test("presentError normalizes non-Error values via getErrorMessage", () => {
  const { result } = renderHook(() => useErrorToast(), { wrapper: createWrapper() });

  act(() => {
    result.current.presentError("a plain string error");
  });

  expect(mockPresent.mock.calls[0][0].message).toBe("a plain string error");
});
