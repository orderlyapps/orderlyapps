import { createContext } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

export const Context = createContext<SupabaseClient | undefined>(undefined)
export const SupabaseProvider = Context.Provider
export const Consumer = Context.Consumer
Context.displayName = 'SupabaseContext'
