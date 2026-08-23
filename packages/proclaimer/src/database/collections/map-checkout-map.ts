import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { mapCheckoutMapSchema } from "../schemas/map-checkout-map.js";
import { persistence } from "../persistence.js";
import { getQueryClient, getSupabase } from "../context.js";

const queryClient = getQueryClient();
const supabase = getSupabase();

const baseOptions = queryCollectionOptions({
  id: "map_checkout_map",
  queryKey: ["map_checkout_map"],
  queryClient,
  schema: mapCheckoutMapSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("map_checkout_map").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("map_checkout_map").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("map_checkout_map")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("map_checkout_map").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const mapCheckoutMapCollection = createCollection({
  ...persistedOptions,
  schema: mapCheckoutMapSchema,
});
