import { z } from 'zod';

export const PropertyItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  timezone: z.string(),
  startTimesLocal: z.array(z.string()),
  endTimesLocal: z.array(z.string())
});

export type PropertyItem = z.infer<typeof PropertyItemSchema>;
