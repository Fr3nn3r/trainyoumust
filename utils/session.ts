import { auth } from '@/lib/auth'
import { Session } from 'next-auth'

/**
 * Ensure there is an authenticated session with a Supabase RLS token.
 * Throws an error if the session or token is missing.
 */
export async function requireSession(): Promise<Session & { supabaseAccessToken: string }> {
  const session = await auth()
  if (!session) {
    throw new Error('User not authenticated')
  }
  if (!session.supabaseAccessToken) {
    throw new Error('Missing supabaseAccessToken')
  }
  return session as Session & { supabaseAccessToken: string }
}
