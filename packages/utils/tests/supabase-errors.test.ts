import { expect, test } from "vite-plus/test";
import { PostgrestError, FunctionsFetchError } from "@supabase/supabase-js";
import { AuthError, AuthRetryableFetchError } from "@supabase/auth-js";
import {
  isPostgrestError,
  isAuthError,
  isNetworkError,
  describeSupabaseError,
} from "../src/supabase/index.ts";

function makePostgrestError({
  message = "error",
  code = "",
  details = "",
  hint = "",
}: Partial<{ message: string; code: string; details: string; hint: string }> = {}) {
  return new PostgrestError({ message, details, hint, code });
}

test("isPostgrestError recognizes a real PostgrestError", () => {
  const err = makePostgrestError({ code: "23505" });
  expect(isPostgrestError(err)).toBe(true);
});

test("isPostgrestError falls back to name check for cross-realm errors", () => {
  const err = new Error("fake");
  err.name = "PostgrestError";
  expect(isPostgrestError(err)).toBe(true);
});

test("isPostgrestError rejects plain errors", () => {
  expect(isPostgrestError(new Error("nope"))).toBe(false);
  expect(isPostgrestError("string")).toBe(false);
});

test("isAuthError recognizes a real AuthError", () => {
  expect(isAuthError(new AuthError("bad", 400))).toBe(true);
});

test("isAuthError falls back to __isAuthError shape", () => {
  const err = new Error("fake") as Error & { __isAuthError: boolean };
  err.__isAuthError = true;
  expect(isAuthError(err)).toBe(true);
});

test("isAuthError rejects plain errors", () => {
  expect(isAuthError(new Error("nope"))).toBe(false);
});

test("isNetworkError detects TypeError fetch failures", () => {
  expect(isNetworkError(new TypeError("Failed to fetch"))).toBe(true);
  expect(isNetworkError(new TypeError("NetworkError when attempting to fetch resource"))).toBe(
    true,
  );
  expect(isNetworkError(new TypeError("Load failed"))).toBe(true);
});

test("isNetworkError rejects non-fetch TypeErrors", () => {
  expect(isNetworkError(new TypeError("Cannot read properties of undefined"))).toBe(false);
});

test("isNetworkError detects FunctionsFetchError", () => {
  expect(isNetworkError(new FunctionsFetchError(new Error("fetch failed")))).toBe(true);
});

test("isNetworkError detects AuthRetryableFetchError", () => {
  expect(isNetworkError(new AuthRetryableFetchError("retry", 500))).toBe(true);
});

test("isNetworkError rejects non-network errors", () => {
  expect(isNetworkError(new Error("nope"))).toBe(false);
  expect(isNetworkError(makePostgrestError())).toBe(false);
});

test("describeSupabaseError: network → connection message", () => {
  expect(describeSupabaseError(new TypeError("Failed to fetch"))).toMatch(/internet connection/i);
});

test("describeSupabaseError: 23505 unique violation", () => {
  expect(describeSupabaseError(makePostgrestError({ code: "23505" }))).toMatch(/already exists/i);
});

test("describeSupabaseError: 23503 foreign key", () => {
  expect(describeSupabaseError(makePostgrestError({ code: "23503" }))).toMatch(
    /referenced record no longer exists/i,
  );
});

test("describeSupabaseError: 23502 not-null", () => {
  expect(describeSupabaseError(makePostgrestError({ code: "23502" }))).toMatch(
    /required field is missing/i,
  );
});

test("describeSupabaseError: 42501 / PGRST301 permission denied", () => {
  expect(describeSupabaseError(makePostgrestError({ code: "42501" }))).toMatch(/permission/i);
  expect(describeSupabaseError(makePostgrestError({ code: "PGRST301" }))).toMatch(/permission/i);
});

test("describeSupabaseError: PGRST116 not found", () => {
  expect(describeSupabaseError(makePostgrestError({ code: "PGRST116" }))).toMatch(
    /no matching record was found/i,
  );
});

test("describeSupabaseError: unknown PostgREST code → raw message", () => {
  const err = makePostgrestError({ message: "weird thing", code: "XYZ123" });
  expect(describeSupabaseError(err)).toBe("weird thing");
});

test("describeSupabaseError: empty PostgREST message → fallback", () => {
  const err = makePostgrestError({ message: "", code: "XYZ123" });
  expect(describeSupabaseError(err, "Fallback")).toBe("Fallback");
});

test("describeSupabaseError: AuthError → its own message", () => {
  expect(describeSupabaseError(new AuthError("Invalid credentials", 400))).toBe(
    "Invalid credentials",
  );
});

test("describeSupabaseError: unknown value → getErrorMessage", () => {
  expect(describeSupabaseError("a plain string")).toBe("a plain string");
  expect(describeSupabaseError(42, "Fallback")).toBe("42");
});
