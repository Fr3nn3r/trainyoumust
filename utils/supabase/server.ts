import { createClient } from '@supabase/supabase-js'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRole = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl) throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
if (!supabaseAnon) throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
if (!supabaseServiceRole) throw new Error('Missing environment variable: SUPABASE_SECRET_KEY')
const getSupabaseClient = async () => {
	const session = await auth()

	if (!session?.supabaseAccessToken) {
		redirect('/')
	}
	// 如何 使用 session.supabaseAccessToken 来创建 supabase client
        return createClient<Database>(
                supabaseUrl,
                supabaseAnon,
                {
                        global: {
                                headers: {
                                        Authorization: `Bearer ${session.supabaseAccessToken}`,
                                },
                        },
                }
        )
}

function createSupabaseAdminClient() {
        // server  api
        return createClient<Database>(
                supabaseUrl,
                supabaseServiceRole,

        )
}
export { getSupabaseClient, createSupabaseAdminClient }
