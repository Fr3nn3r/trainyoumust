import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Create a single supabase client for the entire app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Create a helper for server-side operations
export const createServerSupabaseClient = () => {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")
}
