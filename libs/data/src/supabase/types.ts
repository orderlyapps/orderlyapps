export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      congregations: {
        Row: {
          country: string
          email: string
          id: string
          name: string
          phone: string
          state: string
        }
        Insert: {
          country: string
          email?: string
          id?: string
          name: string
          phone?: string
          state: string
        }
        Update: {
          country?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          state?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          congregation_id: string
          description: string | null
          end_date: string | null
          end_time: string | null
          id: string
          name: string
          start_date: string
          start_time: string | null
        }
        Insert: {
          congregation_id: string
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          id?: string
          name: string
          start_date: string
          start_time?: string | null
        }
        Update: {
          congregation_id?: string
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          id?: string
          name?: string
          start_date?: string
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_events_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
      events_schedule: {
        Row: {
          congregation_id: string
          event_id: string
          week: string
        }
        Insert: {
          congregation_id: string
          event_id: string
          week: string
        }
        Update: {
          congregation_id?: string
          event_id?: string
          week?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_events_schedule_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_schedule_week_congregation_id_fkey"
            columns: ["week", "congregation_id"]
            isOneToOne: false
            referencedRelation: "schedule"
            referencedColumns: ["week", "congregation_id"]
          },
        ]
      }
      privileges: {
        Row: {
          admin: boolean | null
          congregation_id: string
          publisher_id: string
          weekend_meeting_editor: boolean | null
        }
        Insert: {
          admin?: boolean | null
          congregation_id: string
          publisher_id: string
          weekend_meeting_editor?: boolean | null
        }
        Update: {
          admin?: boolean | null
          congregation_id?: string
          publisher_id?: string
          weekend_meeting_editor?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_privileges_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "authorised_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "public_speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
        ]
      }
      publishers: {
        Row: {
          congregation_id: string
          display_name: string | null
          first_name: string
          id: string
          last_name: string
          middle_name: string | null
          outlines: string[] | null
        }
        Insert: {
          congregation_id: string
          display_name?: string | null
          first_name: string
          id?: string
          last_name: string
          middle_name?: string | null
          outlines?: string[] | null
        }
        Update: {
          congregation_id?: string
          display_name?: string | null
          first_name?: string
          id?: string
          last_name?: string
          middle_name?: string | null
          outlines?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule: {
        Row: {
          congregation_id: string
          week: string
        }
        Insert: {
          congregation_id: string
          week: string
        }
        Update: {
          congregation_id?: string
          week?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_schedule_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_schedule_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
      test: {
        Row: {
          created_at: string
          id: number
          publisher_id: string | null
          test: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          publisher_id?: string | null
          test?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          publisher_id?: string | null
          test?: boolean | null
        }
        Relationships: []
      }
      weekend_meetings: {
        Row: {
          chairman: string | null
          congregation_id: string
          outline: string | null
          reader: string | null
          speaker: string | null
          week: string
        }
        Insert: {
          chairman?: string | null
          congregation_id: string
          outline?: string | null
          reader?: string | null
          speaker?: string | null
          week: string
        }
        Update: {
          chairman?: string | null
          congregation_id?: string
          outline?: string | null
          reader?: string | null
          speaker?: string | null
          week?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_weekend_meetings_chairman_fkey"
            columns: ["chairman"]
            isOneToOne: false
            referencedRelation: "authorised_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_chairman_fkey"
            columns: ["chairman"]
            isOneToOne: false
            referencedRelation: "public_speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_chairman_fkey"
            columns: ["chairman"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_reader_fkey"
            columns: ["reader"]
            isOneToOne: false
            referencedRelation: "authorised_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_reader_fkey"
            columns: ["reader"]
            isOneToOne: false
            referencedRelation: "public_speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_reader_fkey"
            columns: ["reader"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_speaker_fkey"
            columns: ["speaker"]
            isOneToOne: false
            referencedRelation: "authorised_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_speaker_fkey"
            columns: ["speaker"]
            isOneToOne: false
            referencedRelation: "public_speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_weekend_meetings_speaker_fkey"
            columns: ["speaker"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admins: {
        Row: {
          congregation_id: string | null
          display_name: string | null
          first_name: string | null
          home_congregation_id: string | null
          last_name: string | null
          middle_name: string | null
          publisher_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_privileges_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "authorised_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "public_speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["home_congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["home_congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
      authorised_users: {
        Row: {
          congregation_id: string | null
          display_name: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          middle_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
      congregations_data: {
        Row: {
          admins: Json | null
          country: string | null
          email: string | null
          id: string | null
          name: string | null
          phone: string | null
          state: string | null
          weekend_meeting_editors: Json | null
        }
        Relationships: []
      }
      public_speakers: {
        Row: {
          congregation_id: string | null
          display_name: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          middle_name: string | null
          outlines: string[] | null
        }
        Insert: {
          congregation_id?: string | null
          display_name?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          middle_name?: string | null
          outlines?: string[] | null
        }
        Update: {
          congregation_id?: string | null
          display_name?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          middle_name?: string | null
          outlines?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
      weekend_meeting_editors: {
        Row: {
          congregation_id: string | null
          display_name: string | null
          first_name: string | null
          home_congregation_id: string | null
          last_name: string | null
          middle_name: string | null
          publisher_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_privileges_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "authorised_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_privileges_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "public_speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["home_congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_publishers_congregation_id_fkey"
            columns: ["home_congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations_data"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      claim_congregation: {
        Args: {
          congregation_id: string
        }
        Returns: {
          id: string
          name: string
          state: string
          country: string
          phone: string
          email: string
          admins: Json
          weekend_meeting_editors: Json
        }[]
      }
      congregation_has_admin: {
        Args: {
          id: string
        }
        Returns: boolean
      }
      publisher_is_admin: {
        Args: {
          publisher_id: string
          congregation_id: string
        }
        Returns: boolean
      }
      publisher_is_editor: {
        Args: {
          publisher_id: string
          congregation_id: string
          table_name: string
        }
        Returns: boolean
      }
      upsert_congregation: {
        Args: {
          id: string
          name: string
          state: string
          country: string
          phone: string
          email: string
        }
        Returns: Database["public"]["CompositeTypes"]["congregations_data_rows"][]
      }
      yield_congregation: {
        Args: {
          congregation_id: string
        }
        Returns: {
          id: string
          name: string
          state: string
          country: string
          phone: string
          email: string
          admins: Json
          weekend_meeting_editors: Json
        }[]
      }
    }
    Enums: {
      event_type: "CO" | "CA" | "RC" | "ME" | "OT"
    }
    CompositeTypes: {
      congregations_data_rows: {
        id: string | null
        name: string | null
        state: string | null
        country: string | null
        phone: string | null
        email: string | null
        admins: Json | null
        weekend_meeting_editors: Json | null
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

