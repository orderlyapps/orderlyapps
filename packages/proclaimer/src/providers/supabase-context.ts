import { createContext, useContext } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

// Sentinel used as the context default so the hooks can distinguish
// "no ProclaimerProvider above me" (programmer error) from "provider exists
// but was not configured with credentials" (expected state, surfaced as null).
const NO_PROVIDER = Symbol("proclaimer/no-supabase-provider");

export const SupabaseContext = createContext<SupabaseClient | null | typeof NO_PROVIDER>(
  NO_PROVIDER,
);

/**
 * Returns the configured Supabase client from the nearest ProclaimerProvider.
 * Throws if rendered outside a ProclaimerProvider, or if the provider was
 * mounted without `supabaseUrl`/`supabaseAnonKey`. Use this in components
 * that require a working client and cannot render anything useful otherwise.
 */
export function useSupabase(): SupabaseClient {
  const value = useContext(SupabaseContext);
  if (value === NO_PROVIDER) {
    throw new Error("useSupabase: no ProclaimerProvider found in the component tree");
  }
  if (value === null) {
    throw new Error(
      "useSupabase: ProclaimerProvider was not configured with supabaseUrl and supabaseAnonKey",
    );
  }
  return value;
}

/**
 * Returns the Supabase client from the nearest ProclaimerProvider, or `null`
 * if the provider was mounted without credentials. Throws if rendered
 * outside a ProclaimerProvider. Use this in components that need to render a
 * "configure your env vars" state instead of crashing on a blank `.env`.
 */
export function useSupabaseOrNull(): SupabaseClient | null {
  const value = useContext(SupabaseContext);
  if (value === NO_PROVIDER) {
    throw new Error("useSupabaseOrNull: no ProclaimerProvider found in the component tree");
  }
  return value;
}
