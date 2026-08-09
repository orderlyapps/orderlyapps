import { createContext, useContext } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

export const SupabaseContext = createContext<SupabaseClient | null>(null);

export function useSupabase(): SupabaseClient | null {
  return useContext(SupabaseContext);
}
