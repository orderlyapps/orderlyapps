import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { authOtpLogSchema } from "../schemas/auth-otp-log.js";
import { getQueryClient, getSupabase } from "../context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "auth_otp_log",
  queryKey: ["auth_otp_log"],
  queryClient,
  schema: authOtpLogSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("auth_otp_log").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("auth_otp_log").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("auth_otp_log")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("auth_otp_log").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});

export const authOtpLogCollection = createCollection({
  ...baseOptions,
  schema: authOtpLogSchema,
});
