import { supabase } from "./supabase"
import type { Database } from "./database.types"

type CheckIn = Database["public"]["Tables"]["check_ins"]["Row"]
type Message = Database["public"]["Tables"]["messages"]["Row"]

export async function getUserCheckIns(userId: string) {
  const { data, error } = await supabase
    .from("check_ins")
    .select("*, messages(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { checkIns: data as (CheckIn & { messages: Message[] })[] | null, error }
}

export async function createCheckIn(userId: string) {
  const { data, error } = await supabase
    .from("check_ins")
    .insert({
      user_id: userId,
    })
    .select()
    .single()

  return { checkIn: data as CheckIn | null, error }
}

export async function getCheckInMessages(checkInId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("check_in_id", checkInId)
    .order("created_at", { ascending: true })

  return { messages: data as Message[] | null, error }
}

export async function addMessage(checkInId: string, content: string, sender: "user" | "coach") {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      check_in_id: checkInId,
      content,
      sender,
    })
    .select()
    .single()

  return { message: data as Message | null, error }
}

// Set up real-time subscription for messages
export function subscribeToMessages(checkInId: string, callback: (message: Message) => void) {
  return supabase
    .channel(`messages:${checkInId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `check_in_id=eq.${checkInId}`,
      },
      (payload) => {
        callback(payload.new as Message)
      },
    )
    .subscribe()
}
