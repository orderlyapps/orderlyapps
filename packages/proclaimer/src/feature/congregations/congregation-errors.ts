import { describeSupabaseError, isPostgrestError } from "@amodeo/utils/supabase";

/**
 * Proclaimer-specific error mapping layered over `describeSupabaseError`.
 *
 * - PostgREST `23503` (foreign key) where the constraint mentions
 *   `congregation_id` → "The selected parent congregation no longer exists."
 * - PostgREST `23505` (unique) → "A congregation with these details already exists."
 * - Everything else delegates to `describeSupabaseError`.
 */
export function describeCongregationError(
  error: unknown,
  fallback = "Something went wrong.",
): string {
  if (isPostgrestError(error)) {
    if (error.code === "23503") {
      const haystack = `${error.details ?? ""} ${error.hint ?? ""}`;
      if (/congregation_id/i.test(haystack)) {
        return "The selected parent congregation no longer exists.";
      }
    }
    if (error.code === "23505") {
      return "A congregation with these details already exists.";
    }
  }
  return describeSupabaseError(error, fallback);
}
