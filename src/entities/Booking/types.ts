import { z } from 'zod';

export const BookingItemSchema = z.object({
  id: z.number(),
  roomId: z.number(),
  startDateUtc: z.string().datetime(),
  endDateUtc: z.string().datetime()
});

export const BookingListSchema = z.array(BookingItemSchema);

export type BookingItem = z.infer<typeof BookingItemSchema>;

export type BookingList = z.infer<typeof BookingListSchema>;
