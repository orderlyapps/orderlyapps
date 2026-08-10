import { describeSupabaseError, isPostgrestError } from "@amodeo/utils/supabase";

/**
 * Proclaimer-specific error mapping layered over `describeSupabaseError`.
 *
 * - PostgREST `23503` (foreign key) where the constraint mentions
 *   `family_id`/`group_id` → "The selected family or group no longer exists."
 *   The FK constraint name (e.g. `publisher_family_id_fkey`) lives in
 *   `error.details`/`error.hint`, not in `error.message`.
 * - PostgREST `23505` (unique) → "A publisher with these details already exists."
 * - Everything else delegates to `describeSupabaseError`.
 */
export function describePublisherError(error: unknown, fallback = "Something went wrong."): string {
  if (isPostgrestError(error)) {
    if (error.code === "23503") {
      const haystack = `${error.details ?? ""} ${error.hint ?? ""}`;
      if (/family_id|group_id/i.test(haystack)) {
        return "The selected family or group no longer exists.";
      }
    }
    if (error.code === "23505") {
      return "A publisher with these details already exists.";
    }
  }
  return describeSupabaseError(error, fallback);
}
