import { PostgrestError, FunctionsFetchError } from "@supabase/supabase-js";
import { AuthError, AuthRetryableFetchError } from "@supabase/auth-js";
import { getErrorMessage } from "../errors/errors.ts";

/**
 * `true` when the value is a PostgREST error. Uses `instanceof` with a
 * `name === "PostgrestError"` fallback for cross-realm safety (e.g. errors
 * crossing an iframe or worker boundary lose their prototype chain).
 */
export function isPostgrestError(error: unknown): error is PostgrestError {
  return (
    error instanceof PostgrestError || (error instanceof Error && error.name === "PostgrestError")
  );
}

/**
 * `true` when the value is a Supabase Auth error. Uses `instanceof` with a
 * `__isAuthError === true` shape fallback for cross-realm safety.
 */
export function isAuthError(error: unknown): error is AuthError {
  if (error instanceof AuthError) return true;
  return error instanceof Error && (error as { __isAuthError?: unknown }).__isAuthError === true;
}

/**
 * `true` when the value represents a network failure: a `TypeError` from
 * `fetch`, a Supabase `FunctionsFetchError`, or an `AuthRetryableFetchError`.
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof FunctionsFetchError) return true;
  if (error instanceof AuthRetryableFetchError) return true;
  // `fetch` rejects with a TypeError on network failures; narrow the check
  // so genuine coding bugs (e.g. "Cannot read properties of undefined") are
  // not misclassified as network errors. The patterns below match the known
  // browser messages for fetch/network failures without matching substrings
  // like "fetch" in unrelated TypeError messages.
  if (error instanceof TypeError) {
    const msg = error.message;
    if (/^failed to fetch$/i.test(msg)) return true;
    if (/networkerror when attempting to fetch/i.test(msg)) return true;
    if (/^load failed$/i.test(msg)) return true;
  }
  return false;
}

const NETWORK_MESSAGE = "Couldn't reach the server. Check your internet connection and try again.";

const POSTGREST_CODE_MESSAGES: Record<string, string> = {
  "23505": "This record already exists.",
  "23503": "A referenced record no longer exists.",
  "23502": "A required field is missing.",
  "42501": "You don't have permission to do that.",
  PGRST301: "You don't have permission to do that.",
  PGRST116: "No matching record was found.",
};

/**
 * Maps a Supabase/PostgREST/Auth error into a user-friendly message.
 *
 * - Network failures → a connection-check prompt.
 * - PostgREST errors → friendly text keyed by `error.code`, falling back to
 *   the raw `error.message`.
 * - Auth errors → their own `message` (auth-js messages are user-safe).
 * - Anything else → `getErrorMessage(error, fallback)`.
 */
export function describeSupabaseError(error: unknown, fallback = "Something went wrong."): string {
  if (isNetworkError(error)) return NETWORK_MESSAGE;

  if (isPostgrestError(error)) {
    const mapped = POSTGREST_CODE_MESSAGES[error.code];
    if (mapped) return mapped;
    const message = error.message?.trim();
    return message && message.length > 0 ? message : fallback;
  }

  if (isAuthError(error)) {
    const message = error.message?.trim();
    return message && message.length > 0 ? message : fallback;
  }

  return getErrorMessage(error, fallback);
}
