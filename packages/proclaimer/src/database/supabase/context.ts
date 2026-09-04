import type { SupabaseClient } from "@supabase/supabase-js";
import type { QueryClient } from "@tanstack/react-query";

export interface DatabaseContext {
  supabase: SupabaseClient;
  queryClient: QueryClient;
}

let context: DatabaseContext | null = null;

/**
 * Wires the app-level supabase client and query client into the database
 * collections. Must be called once at app bootstrap, before any collection is
 * actually used (queries executed, mutations applied, etc.).
 *
 * Collection modules call {@link getSupabase} / {@link getQueryClient} at
 * module-evaluation time. In dev (native ESM) the init module is always
 * evaluated first, but production code-splitting can place collection modules
 * in a chunk that is evaluated before the chunk containing the init call.
 * To stay chunk-order-independent, the getters return lazy proxies when the
 * context is not yet set — the proxies forward every property access to the
 * real client once init has run.
 */
export function initDatabase(deps: DatabaseContext): void {
  context = deps;
}

/**
 * Creates a proxy that defers all property access to the object returned by
 * `resolve`. The resolver is called on every access so the real target is
 * always up-to-date. Methods are bound to the real target so `this` is correct.
 */
function lazyProxy<T extends object>(resolve: () => T): T {
  return new Proxy({} as T, {
    get(_, prop) {
      const target = resolve();
      const value = Reflect.get(target, prop);
      return typeof value === "function" ? value.bind(target) : value;
    },
    has(_, prop) {
      return Reflect.has(resolve(), prop);
    },
    getOwnPropertyDescriptor(_, prop) {
      return Reflect.getOwnPropertyDescriptor(resolve(), prop);
    },
  });
}

const NOT_INITIALIZED_ERROR =
  "Database not initialized. Call initDatabase({ supabase, queryClient }) from " +
  "@amodeo/proclaimer/database/context before using collection modules.";

export function getSupabase(): SupabaseClient {
  if (context) return context.supabase;
  return lazyProxy<SupabaseClient>(() => {
    if (!context) throw new Error(NOT_INITIALIZED_ERROR);
    return context.supabase;
  });
}

export function getQueryClient(): QueryClient {
  if (context) return context.queryClient;
  return lazyProxy<QueryClient>(() => {
    if (!context) throw new Error(NOT_INITIALIZED_ERROR);
    return context.queryClient;
  });
}
