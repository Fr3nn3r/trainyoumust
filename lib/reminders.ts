import { supabase } from "./supabase"
import type { Database } from "./database.types"

export type Reminder = Database["public"]["Tables"]["reminders"]["Row"]

export async function getUserReminders(userId: string) {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  return { reminders: data as Reminder[] | null, error }
}

export async function createReminder(
  userId: string,
  reminder: {
    title: string
    date: string
    time: string
    notification_method: string
    reminder_type: string
  },
) {
  const { data, error } = await supabase
    .from("reminders")
    .insert({
      user_id: userId,
      title: reminder.title,
      date: reminder.date,
      time: reminder.time,
      notification_method: reminder.notification_method,
      reminder_type: reminder.reminder_type,
      completed: false,
    })
    .select()
    .single()

  return { reminder: data as Reminder | null, error }
}

export async function updateReminder(reminderId: string, updates: Partial<Reminder>) {
  const { data, error } = await supabase.from("reminders").update(updates).eq("id", reminderId).select().single()

  return { reminder: data as Reminder | null, error }
}

export async function deleteReminder(reminderId: string) {
  const { error } = await supabase.from("reminders").delete().eq("id", reminderId)

  return { error }
}

// Set up real-time subscription for reminders
export function subscribeToReminders(userId: string, callback: (reminder: Reminder) => void) {
  return supabase
    .channel(`reminders:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "reminders",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Reminder)
      },
    )
    .subscribe()
}
