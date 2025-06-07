import { supabase } from "./supabase"
import type { Database } from "./database.types"

type Goal = Database["public"]["Tables"]["goals"]["Row"]

export async function getUserGoals(userId: string) {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { goals: data as Goal[] | null, error }
}

export async function createGoal(userId: string, goal: { title: string; description?: string }) {
  const { data, error } = await supabase
    .from("goals")
    .insert({
      user_id: userId,
      title: goal.title,
      description: goal.description || "",
      progress: 0,
      completed: false,
    })
    .select()
    .single()

  return { goal: data as Goal | null, error }
}

export async function updateGoal(goalId: string, updates: Partial<Goal>) {
  const { data, error } = await supabase.from("goals").update(updates).eq("id", goalId).select().single()

  return { goal: data as Goal | null, error }
}

export async function deleteGoal(goalId: string) {
  const { error } = await supabase.from("goals").delete().eq("id", goalId)

  return { error }
}
