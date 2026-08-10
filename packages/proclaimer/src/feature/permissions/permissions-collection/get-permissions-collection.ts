import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createPermissionsCollection,
  type PermissionsCollection,
} from "./create-permissions-collection.js";
import type { PermissionType } from "../permission-schema.js";

const collections = new WeakMap<
  SupabaseClient,
  WeakMap<QueryClient, Map<PermissionType, PermissionsCollection>>
>();

export function getPermissionsCollection(
  supabase: SupabaseClient,
  queryClient: QueryClient,
  type: PermissionType,
) {
  let byQueryClient = collections.get(supabase);
  if (!byQueryClient) {
    byQueryClient = new WeakMap();
    collections.set(supabase, byQueryClient);
  }
  let byType = byQueryClient.get(queryClient);
  if (!byType) {
    byType = new Map();
    byQueryClient.set(queryClient, byType);
  }
  let collection = byType.get(type);
  if (!collection) {
    collection = createPermissionsCollection(supabase, queryClient, type);
    byType.set(type, collection);
  }
  return collection;
}
