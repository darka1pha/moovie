export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string
          id: number
          item_id: string | null
          media_type: string | null
          name: string | null
          poster_url: string | null
          rate: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          item_id?: string | null
          media_type?: string | null
          name?: string | null
          poster_url?: string | null
          rate?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          item_id?: string | null
          media_type?: string | null
          name?: string | null
          poster_url?: string | null
          rate?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
