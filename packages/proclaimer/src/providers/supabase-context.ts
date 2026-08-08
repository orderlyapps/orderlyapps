import { createContext, useContext } from "react";
import type { TypedSupabaseClient } from "../supabase/create-supabase-client.js";

export const SupabaseContext = createContext<TypedSupabaseClient | null>(null);

export function useSupabase(): TypedSupabaseClient | null {
  return useContext(SupabaseContext);
}
