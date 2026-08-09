import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createSupabaseClient } from "../supabase/create-supabase-client.js";
import { SupabaseContext } from "./supabase-context.js";

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

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
    </QueryClientProvider>
  );
}
