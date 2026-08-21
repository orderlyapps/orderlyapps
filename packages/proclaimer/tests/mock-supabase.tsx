import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { SupabaseContext } from "../src/supabase/supabase-context.ts";
import type { PublisherRecord } from "../src/feature/publishers/publisher-schema.ts";

export interface MockSupabaseResult {
  data?: unknown[] | null;
  error?: Error | null;
  updateError?: Error | null;
  onUpdate?: (payload: Record<string, unknown>, id: string) => void;
}

// Minimal stand-in for the chains used by the publishers collection:
// supabase.from("publisher").select("*")
// supabase.from("publisher").update(payload).eq("id", id)
export function createMockSupabase(result: MockSupabaseResult): SupabaseClient {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: result.data ?? null, error: result.error ?? null }),
      update: (payload: Record<string, unknown>) => ({
        eq: (_col: string, id: string) => {
          result.onUpdate?.(payload, id);
          return Promise.resolve({ data: null, error: result.updateError ?? null });
        },
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
