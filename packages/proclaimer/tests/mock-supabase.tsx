import { QueryClientProvider } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { SupabaseContext } from "../src/providers/supabase-context.ts";
import { initDatabase } from "../src/database/context.ts";
import type { PublisherRecord } from "../src/feature/publishers/publisher-schema.ts";
import { testQueryClient, resetPublisherCollection } from "./test-query-client.ts";

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

// publisherCollection is a singleton wired to the database context. The mock
// in setup.ts binds it to the shared testQueryClient. Each test calls
// initDatabase to point getSupabase() at the mock supabase, then resets the
// collection so it gets a fresh QueryObserver for the new mock data.
export function createWrapper(supabase: SupabaseClient | null) {
  if (supabase) {
    initDatabase({ supabase, queryClient: testQueryClient });
  }
  // Re-create the collection so each test gets a fresh QueryObserver. The
  // queryFn calls getSupabase() at query time, so it picks up the mock
  // supabase set via initDatabase above.
  resetPublisherCollection();
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={testQueryClient}>
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
