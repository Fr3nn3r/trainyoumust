import { supabase } from "./supabase"
import type { Database } from "./database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type CoachingPreferences = Database["public"]["Tables"]["coaching_preferences"]["Row"]
type NotificationPreferences = Database["public"]["Tables"]["notification_preferences"]["Row"]

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  return { profile: data as Profile | null, error }
}

export async function updateUserProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  return { profile: data as Profile | null, error }
}

export async function getCoachingPreferences(userId: string) {
  const { data, error } = await supabase.from("coaching_preferences").select("*").eq("user_id", userId).single()

  return { preferences: data as CoachingPreferences | null, error }
}

export async function updateCoachingPreferences(userId: string, updates: Partial<CoachingPreferences>) {
  // Check if preferences exist
  const { data: existing } = await supabase.from("coaching_preferences").select("id").eq("user_id", userId).single()

  if (existing) {
    // Update existing preferences
    const { data, error } = await supabase
      .from("coaching_preferences")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single()

    return { preferences: data as CoachingPreferences | null, error }
  } else {
    // Insert new preferences
    const { data, error } = await supabase
      .from("coaching_preferences")
      .insert({ user_id: userId, ...updates })
      .select()
      .single()

    return { preferences: data as CoachingPreferences | null, error }
  }
}

export async function getNotificationPreferences(userId: string) {
  const { data, error } = await supabase.from("notification_preferences").select("*").eq("user_id", userId).single()

  return { preferences: data as NotificationPreferences | null, error }
}

export async function updateNotificationPreferences(userId: string, updates: Partial<NotificationPreferences>) {
  // Check if preferences exist
  const { data: existing } = await supabase.from("notification_preferences").select("id").eq("user_id", userId).single()

  if (existing) {
    // Update existing preferences
    const { data, error } = await supabase
      .from("notification_preferences")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single()

    return { preferences: data as NotificationPreferences | null, error }
  } else {
    // Insert new preferences
    const { data, error } = await supabase
      .from("notification_preferences")
      .insert({ user_id: userId, ...updates })
      .select()
      .single()

    return { preferences: data as NotificationPreferences | null, error }
  }
}

export async function getUserStats(userId: string) {
  const { data, error } = await supabase.from("user_stats").select("*").eq("user_id", userId).single()

  return { stats: data, error }
}
