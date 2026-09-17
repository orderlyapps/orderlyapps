import { z } from "zod";

export const regularPioneerSchema = z.object({
  id: z.uuid().optional(),
  publisher_id: z.uuid(),
  congregation_id: z.uuid(),
  start_month: z.string(),
  end_month: z.string().nullable(),
  created_by: z.uuid().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type RegularPioneer = z.infer<typeof regularPioneerSchema>;
