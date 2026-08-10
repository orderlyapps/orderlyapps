import { describeSupabaseError, isPostgrestError } from "@amodeo/utils/supabase";

/**
 * Proclaimer-specific error mapping layered over `describeSupabaseError`.
 *
 * - PostgREST `23503` (foreign key) where the constraint mentions
 *   `auth_user_id` → "That user no longer exists."
 *   `congregation_id` → "The selected congregation no longer exists."
 * - PostgREST `23505` (unique) → "This permission has already been granted."
 * - Everything else delegates to `describeSupabaseError`.
 */
export function describePermissionError(
  error: unknown,
  fallback = "Something went wrong.",
): string {
  if (isPostgrestError(error)) {
    if (error.code === "23503") {
      const haystack = `${error.details ?? ""} ${error.hint ?? ""}`;
      if (/auth_user_id/i.test(haystack)) {
        return "That user no longer exists.";
      }
      if (/congregation_id/i.test(haystack)) {
        return "The selected congregation no longer exists.";
      }
    }
    if (error.code === "23505") {
      return "This permission has already been granted.";
    }
  }
  return describeSupabaseError(error, fallback);
}
