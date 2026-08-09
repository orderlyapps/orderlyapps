import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { SupabaseContext } from "../src/providers/supabase-context.ts";
import type { PublisherRecord } from "../src/feature/publishers/publisher-schema.ts";

export interface MockSupabaseResult {
  data?: unknown[] | null;
  error?: Error | null;
}

// Minimal stand-in for the chain used by the publishers collection:
// supabase.from("publisher").select("*").is("archived_at", null)
export function createMockSupabase(result: MockSupabaseResult): SupabaseClient {
  return {
    from: () => ({
      select: () => ({
        is: () => Promise.resolve({ data: result.data ?? null, error: result.error ?? null }),
      }),
    }),
  } as unknown as SupabaseClient;
}

// getPublishersCollection memoizes collections per (supabase, queryClient) pair
// in WeakMaps, so every test must build a fresh mock client AND a fresh
// QueryClient here — reusing either leaks the previous test's collection/data.
export function createWrapper(supabase: SupabaseClient | null) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
      </QueryClientProvider>
    );
  };
}

export function makePublisherRow(overrides: Partial<PublisherRecord> = {}): PublisherRecord {
  return {
    id: crypto.randomUUID(),
    first_name: "Ada",
    middle_name: null,
    last_name: "Lovelace",
    display_name: null,
    congregation_id: crypto.randomUUID(),
    standing: "publisher",
    type: "publisher",
    gender: "female",
    family_id: null,
    group_id: null,
    auth_id: null,
    archived_at: null,
    ...overrides,
  };
}
