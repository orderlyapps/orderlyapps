import { z } from "zod";

/**
 * The standard congregation-scoped permission tables. Each maps to a
 * `<type>_permission` table in the public schema sharing the same column
 * layout: a composite primary key of `(auth_user_id, congregation_id)` plus
 * `granted_by`, `can_edit`, and timestamp columns.
 *
 * `report_permission` and `congregation_admin` are intentionally excluded —
 * they have distinct schemas (an `id`/`group_id` PK and `can_read` for
 * reports; `created_by` and no `can_edit`/`granted_by` for admins) and warrant
 * their own dedicated collections.
 */
export const PERMISSION_TYPES = [
  "av_overseer",
  "clam_overseer",
  "clean",
  "cobe",
  "elder",
  "event",
  "ministerial_servant",
  "reminder",
  "secretary",
  "service_overseer",
  "speaker",
  "territory_servant",
  "watchtower",
  "weekend",
] as const;

export type PermissionType = (typeof PERMISSION_TYPES)[number];

/** Returns the Supabase table name for a permission type, e.g. `clean` → `clean_permission`. */
export function permissionTableName(type: PermissionType): string {
  return `${type}_permission`;
}

export const permissionRecordSchema = z.object({
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  granted_by: z.uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  can_edit: z.boolean(),
});

export const permissionInsertSchema = permissionRecordSchema.partial({
  granted_by: true,
  created_at: true,
  updated_at: true,
  can_edit: true,
});

export type PermissionRecord = z.infer<typeof permissionRecordSchema>;
export type PermissionInsert = z.infer<typeof permissionInsertSchema>;

/**
 * Builds the composite collection key for a permission row. The standard
 * permission tables use `(auth_user_id, congregation_id)` as their primary
 * key, so the two are combined into a single stable string.
 */
export function permissionKey(record: PermissionRecord): string {
  return `${record.auth_user_id}:${record.congregation_id}`;
}
