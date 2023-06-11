import { isoDateSchema } from '@/shared';
import { z } from 'zod';

export const BookingItemSchema = z.object({
  id: z.number(),
  roomId: z.number(),
  startDateUtc: z.string().datetime(),
  endDateUtc: z.string().datetime()
});

export const BookingCheckoutSchema = z.object({
  startDate: isoDateSchema,
  endDate: isoDateSchema,
  roomId: z.number(),
  productIdList: z.array(z.number())
});

export const BookingListSchema = z.array(BookingItemSchema);

export type BookingItem = z.infer<typeof BookingItemSchema>;

export type BookingList = z.infer<typeof BookingListSchema>;

export type BookingCheckoutType = z.infer<typeof BookingCheckoutSchema>;
