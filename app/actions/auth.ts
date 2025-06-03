'use server'

import { signIn, signOut } from "@/lib/auth"
import { requireSession } from '@/utils/session'

export async function handleSignIn() {
	// magic link and google both 
	await signIn("credentials", { redirectTo: "/app" })
	//redirect to app
	// redirect("/app")
	// await signIn("nodemailer", { redirectTo: "/app" })
}

export async function handleSignOut() {
        // Ensure a session exists before attempting to sign out
        await requireSession().catch(() => null)
        await signOut({ redirectTo: "/" })
}
