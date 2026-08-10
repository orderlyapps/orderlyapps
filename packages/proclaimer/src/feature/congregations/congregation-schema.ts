import { z } from "zod";

export const congregationRecordSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  congregation_id: z.uuid().nullable(),
  password: z.string().nullable(),
});

export const congregationInsertSchema = congregationRecordSchema.partial({
  id: true,
  congregation_id: true,
  password: true,
});

export type CongregationRecord = z.infer<typeof congregationRecordSchema>;
export type CongregationInsert = z.infer<typeof congregationInsertSchema>;
