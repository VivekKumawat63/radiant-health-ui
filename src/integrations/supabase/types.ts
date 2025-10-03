export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      allergies: {
        Row: {
          allergen: string
          created_at: string | null
          id: string
          reaction: string | null
          severity: string | null
          user_id: string
        }
        Insert: {
          allergen: string
          created_at?: string | null
          id?: string
          reaction?: string | null
          severity?: string | null
          user_id: string
        }
        Update: {
          allergen?: string
          created_at?: string | null
          id?: string
          reaction?: string | null
          severity?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "allergies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          doctor_name: string
          id: string
          location: string | null
          notes: string | null
          specialty: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          doctor_name: string
          id?: string
          location?: string | null
          notes?: string | null
          specialty?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          doctor_name?: string
          id?: string
          location?: string | null
          notes?: string | null
          specialty?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      consent_logs: {
        Row: {
          consent_given: boolean
          consent_type: string
          created_at: string | null
          doctor_id: string
          expires_at: string | null
          id: string
          patient_id: string
          purpose: string | null
          revoked_at: string | null
        }
        Insert: {
          consent_given: boolean
          consent_type: string
          created_at?: string | null
          doctor_id: string
          expires_at?: string | null
          id?: string
          patient_id: string
          purpose?: string | null
          revoked_at?: string | null
        }
        Update: {
          consent_given?: boolean
          consent_type?: string
          created_at?: string | null
          doctor_id?: string
          expires_at?: string | null
          id?: string
          patient_id?: string
          purpose?: string | null
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_logs_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      diet_tracker: {
        Row: {
          calories: number | null
          food_items: string | null
          id: string
          meal_type: string | null
          recorded_at: string | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          food_items?: string | null
          id?: string
          meal_type?: string | null
          recorded_at?: string | null
          user_id: string
        }
        Update: {
          calories?: number | null
          food_items?: string | null
          id?: string
          meal_type?: string | null
          recorded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_tracker_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_credentials: {
        Row: {
          credential_type: string
          doctor_id: string
          extracted_data: Json | null
          file_name: string
          file_url: string
          id: string
          uploaded_at: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
        }
        Insert: {
          credential_type: string
          doctor_id: string
          extracted_data?: Json | null
          file_name: string
          file_url: string
          id?: string
          uploaded_at?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
        }
        Update: {
          credential_type?: string
          doctor_id?: string
          extracted_data?: Json | null
          file_name?: string
          file_url?: string
          id?: string
          uploaded_at?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_credentials_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_profiles: {
        Row: {
          bio: string | null
          clinic_address: string | null
          clinic_latitude: number | null
          clinic_longitude: number | null
          consultation_fee: number | null
          created_at: string | null
          experience_years: number
          id: string
          languages: string[]
          rating: number | null
          specializations: string[]
          teleconsult_available: boolean | null
          total_consultations: number | null
          updated_at: string | null
          user_id: string
          verified_at: string | null
          verified_by: string | null
          verified_status: string | null
          verifier_notes: string | null
          working_hours: Json | null
        }
        Insert: {
          bio?: string | null
          clinic_address?: string | null
          clinic_latitude?: number | null
          clinic_longitude?: number | null
          consultation_fee?: number | null
          created_at?: string | null
          experience_years: number
          id?: string
          languages: string[]
          rating?: number | null
          specializations: string[]
          teleconsult_available?: boolean | null
          total_consultations?: number | null
          updated_at?: string | null
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
          verified_status?: string | null
          verifier_notes?: string | null
          working_hours?: Json | null
        }
        Update: {
          bio?: string | null
          clinic_address?: string | null
          clinic_latitude?: number | null
          clinic_longitude?: number | null
          consultation_fee?: number | null
          created_at?: string | null
          experience_years?: number
          id?: string
          languages?: string[]
          rating?: number | null
          specializations?: string[]
          teleconsult_available?: boolean | null
          total_consultations?: number | null
          updated_at?: string | null
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
          verified_status?: string | null
          verifier_notes?: string | null
          working_hours?: Json | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          date: string | null
          document_type: string
          file_url: string | null
          id: string
          notes: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          document_type: string
          file_url?: string | null
          id?: string
          notes?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          document_type?: string
          file_url?: string | null
          id?: string
          notes?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_insights: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          insight_type: string
          severity: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          insight_type: string
          severity?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          insight_type?: string
          severity?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_insights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_metrics: {
        Row: {
          id: string
          metric_type: string
          recorded_at: string | null
          unit: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          id?: string
          metric_type: string
          recorded_at?: string | null
          unit?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          id?: string
          metric_type?: string
          recorded_at?: string | null
          unit?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_history: {
        Row: {
          created_at: string | null
          diagnosis: string | null
          doctor_name: string | null
          id: string
          notes: string | null
          record_type: string
          status: string | null
          updated_at: string | null
          user_id: string
          visit_date: string | null
        }
        Insert: {
          created_at?: string | null
          diagnosis?: string | null
          doctor_name?: string | null
          id?: string
          notes?: string | null
          record_type: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          visit_date?: string | null
        }
        Update: {
          created_at?: string | null
          diagnosis?: string | null
          doctor_name?: string | null
          id?: string
          notes?: string | null
          record_type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string | null
          dosage: string | null
          end_date: string | null
          frequency: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dosage?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dosage?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          blood_type: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          blood_type?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          blood_type?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vaccinations: {
        Row: {
          created_at: string | null
          date_administered: string | null
          id: string
          next_dose_date: string | null
          provider: string | null
          user_id: string
          vaccine_name: string
        }
        Insert: {
          created_at?: string | null
          date_administered?: string | null
          id?: string
          next_dose_date?: string | null
          provider?: string | null
          user_id: string
          vaccine_name: string
        }
        Update: {
          created_at?: string | null
          date_administered?: string | null
          id?: string
          next_dose_date?: string | null
          provider?: string | null
          user_id?: string
          vaccine_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wellness_reminders: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          reminder_type: string
          scheduled_time: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reminder_type: string
          scheduled_time?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reminder_type?: string
          scheduled_time?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wellness_reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "doctor" | "patient"
      user_role: "patient" | "doctor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "patient"],
      user_role: ["patient", "doctor"],
    },
  },
} as const
