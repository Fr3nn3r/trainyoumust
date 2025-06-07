// Environment variables for Supabase
export const SUPABASE_CONFIG = {
  // Public variables (accessible in browser)
  publicVars: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
  // Server-only variables (not exposed to browser)
  serverVars: {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
}

// Validate environment variables
export function validateEnv() {
  const missingVars = []

  // Check public vars
  for (const [key, value] of Object.entries(SUPABASE_CONFIG.publicVars)) {
    if (!value) missingVars.push(key)
  }

  // Check server vars
  for (const [key, value] of Object.entries(SUPABASE_CONFIG.serverVars)) {
    if (!value) missingVars.push(key)
  }

  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(", ")}`)
    return false
  }

  return true
}
