import { expect, test } from "vite-plus/test";
import { toError, getErrorMessage } from "../src/index.ts";

test("toError passes Error instances through unchanged", () => {
  const err = new Error("boom");
  expect(toError(err)).toBe(err);
});

test("toError wraps a string into an Error", () => {
  const err = toError("oops");
  expect(err).toBeInstanceOf(Error);
  expect(err.message).toBe("oops");
});

test("toError wraps an object with a message property", () => {
  const err = toError({ message: "from object", code: 42 });
  expect(err).toBeInstanceOf(Error);
  expect(err.message).toBe("from object");
});

test("toError stringifies anything else", () => {
  const err = toError(123);
  expect(err).toBeInstanceOf(Error);
  expect(err.message).toBe("123");
});

test("toError handles a non-string message property", () => {
  const err = toError({ message: 456 });
  expect(err.message).toBe("456");
});

test("getErrorMessage returns the error message", () => {
  expect(getErrorMessage(new Error("hello"))).toBe("hello");
});

test("getErrorMessage falls back when the message is empty", () => {
  expect(getErrorMessage(new Error(""))).toBe("Something went wrong.");
  expect(getErrorMessage(new Error("   "), "Default")).toBe("Default");
});

test("getErrorMessage normalizes non-Error values", () => {
  expect(getErrorMessage("plain string")).toBe("plain string");
  expect(getErrorMessage(42, "fallback")).toBe("42");
});
