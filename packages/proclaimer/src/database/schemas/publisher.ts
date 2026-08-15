import { z } from "zod";

export const PUBLISHER_TYPES = [
  "publisher",
  "regular_pioneer",
  "special_pioneer",
  "continuous_auxiliary",
  "inactive",
  "speaker",
  "associate",
  "circuit_overseer",
] as const;

export const publisherSchema = z.object({
  id: z.uuid().optional(),
  first_name: z.string(),
  middle_name: z.string().nullable().optional(),
  last_name: z.string(),
  display_name: z.string().nullable().optional(),
  congregation_id: z.uuid(),
  standing: z.enum([
    "elder",
    "ministerial_servant",
    "publisher",
    "unbaptised_publisher",
    "associate",
  ]),
  type: z.enum(PUBLISHER_TYPES),
  gender: z.enum(["male", "female"]),
  family_id: z.uuid().nullable().optional(),
  group_id: z.uuid().nullable().optional(),
  auth_id: z.uuid().nullable().optional(),
  archived_at: z.string().nullable().optional(),
});

export type Publisher = z.infer<typeof publisherSchema>;

/**
 * Stricter variant of {@link publisherSchema} for rows that have been loaded
 * from the database. All nullable columns are present (never `undefined`) and
 * `id` is required. Use this when typing query results or component props that
 * always receive a fully-formed row.
 */
export const publisherRecordSchema = publisherSchema.extend({
  id: z.uuid(),
  middle_name: z.string().nullable(),
  display_name: z.string().nullable(),
  family_id: z.uuid().nullable(),
  group_id: z.uuid().nullable(),
  auth_id: z.uuid().nullable(),
  archived_at: z.string().nullable(),
});

export type PublisherRecord = z.infer<typeof publisherRecordSchema>;
