import { expect, test } from "vite-plus/test";
import { PostgrestError } from "@supabase/supabase-js";
import { describePublisherError } from "../src/feature/publishers/publisher-errors.ts";

function makePostgrestError({
  message = "error",
  code = "",
  details = "",
  hint = "",
}: Partial<{ message: string; code: string; details: string; hint: string }>) {
  return new PostgrestError({ message, details, hint, code });
}

test("23503 with family_id constraint → family/group message", () => {
  const err = makePostgrestError({
    code: "23503",
    details: 'Key (family_id)=(abc) is not present in table "publisher".',
    hint: "publisher_family_id_fkey",
  });
  expect(describePublisherError(err)).toBe("The selected family or group no longer exists.");
});

test("23503 with group_id constraint → family/group message", () => {
  const err = makePostgrestError({
    code: "23503",
    details: 'Key (group_id)=(xyz) is not present in table "publisher_group".',
  });
  expect(describePublisherError(err)).toBe("The selected family or group no longer exists.");
});

test("23503 without family/group constraint → generic FK message", () => {
  const err = makePostgrestError({
    code: "23503",
    details: 'Key (congregation_id)=(abc) is not present in table "congregation".',
  });
  expect(describePublisherError(err)).toMatch(/referenced record no longer exists/i);
});

test("23505 unique violation → already exists message", () => {
  const err = makePostgrestError({ code: "23505", message: "duplicate key" });
  expect(describePublisherError(err)).toBe("A publisher with these details already exists.");
});

test("delegates to describeSupabaseError for other codes", () => {
  const err = makePostgrestError({ code: "42501", message: "rls denied" });
  expect(describePublisherError(err)).toMatch(/permission/i);
});

test("delegates to describeSupabaseError for non-PostgREST errors", () => {
  expect(describePublisherError(new Error("boom"))).toBe("boom");
  expect(describePublisherError("plain string")).toBe("plain string");
});
