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

export const publisherRecordSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  display_name: z.string().nullable(),
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
  family_id: z.uuid().nullable(),
  group_id: z.uuid().nullable(),
  auth_id: z.uuid().nullable(),
  archived_at: z.string().nullable(),
});

export const publisherInsertSchema = publisherRecordSchema.partial({
  id: true,
  middle_name: true,
  display_name: true,
  family_id: true,
  group_id: true,
  auth_id: true,
  archived_at: true,
});

export type PublisherRecord = z.infer<typeof publisherRecordSchema>;
export type PublisherInsert = z.infer<typeof publisherInsertSchema>;
