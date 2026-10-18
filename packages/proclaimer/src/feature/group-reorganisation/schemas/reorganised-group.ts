import { z } from "zod";

export const reorganisedGroupSchema = z.object({
  id: z.uuid(),
  congregation_id: z.uuid(),
  name: z.string(),
  overseer_id: z.uuid().nullable().optional(),
  assistant_id: z.uuid().nullable().optional(),
  member_ids: z.array(z.uuid()),
});

export type ReorganisedGroup = z.infer<typeof reorganisedGroupSchema>;
