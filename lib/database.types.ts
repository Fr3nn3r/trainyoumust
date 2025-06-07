export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          age: string | null
          gender: string | null
          job: string | null
          whatsapp_number: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          age?: string | null
          gender?: string | null
          job?: string | null
          whatsapp_number?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          age?: string | null
          gender?: string | null
          job?: string | null
          whatsapp_number?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      coaching_preferences: {
        Row: {
          id: string
          user_id: string
          coaching_style: string | null
          motivation_style: string | null
          personality_type: string | null
          work_schedule: string | null
          hobbies: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          coaching_style?: string | null
          motivation_style?: string | null
          personality_type?: string | null
          work_schedule?: string | null
          hobbies?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          coaching_style?: string | null
          motivation_style?: string | null
          personality_type?: string | null
          work_schedule?: string | null
          hobbies?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      notification_preferences: {
        Row: {
          id: string
          user_id: string
          notification_methods: string[] | null
          reminder_frequency: string | null
          preferred_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          notification_methods?: string[] | null
          reminder_frequency?: string | null
          preferred_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          notification_methods?: string[] | null
          reminder_frequency?: string | null
          preferred_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          progress: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          progress?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          progress?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      check_ins: {
        Row: {
          id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          check_in_id: string
          content: string
          sender: string
          created_at: string
        }
        Insert: {
          id?: string
          check_in_id: string
          content: string
          sender: string
          created_at?: string
        }
        Update: {
          id?: string
          check_in_id?: string
          content?: string
          sender?: string
          created_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          user_id: string
          title: string
          date: string
          time: string
          notification_method: string
          reminder_type: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          date: string
          time: string
          notification_method: string
          reminder_type: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          date?: string
          time?: string
          notification_method?: string
          reminder_type?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string
          total_check_ins: number
          current_streak: number
          last_check_in: string | null
          profile_completion: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_check_ins?: number
          current_streak?: number
          last_check_in?: string | null
          profile_completion?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_check_ins?: number
          current_streak?: number
          last_check_in?: string | null
          profile_completion?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
