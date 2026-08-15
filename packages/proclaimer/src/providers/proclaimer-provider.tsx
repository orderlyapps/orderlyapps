import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createSupabaseClient } from "../supabase/create-supabase-client.js";
import { SupabaseContext } from "./supabase-context.js";
import { initDatabase } from "../database/context.js";

export interface ProclaimerProviderProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
  children: ReactNode;
}

export function ProclaimerProvider({
  supabaseUrl,
  supabaseAnonKey,
  children,
}: ProclaimerProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const [supabase] = useState(() =>
    supabaseUrl && supabaseAnonKey ? createSupabaseClient(supabaseUrl, supabaseAnonKey) : null,
  );

  // Wire the provider's clients into the database context so collection
  // singletons (e.g. publisherCollection) route queries through the same
  // supabase client and query cache this provider supplies via React context.
  // initDatabase is idempotent — it just sets a module-level variable — so
  // calling it during render is safe and won't trigger re-renders.
  if (supabase) {
    initDatabase({ supabase, queryClient });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
    </QueryClientProvider>
  );
}
