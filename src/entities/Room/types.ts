import { z } from 'zod';

export const RoomItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  pricePerNightNet: z.number(),
  priceTaxPercentage: z.number(),
  image: z.string()
});

export const RoomListSchema = z.array(RoomItemSchema);

export type RoomItem = z.infer<typeof RoomItemSchema>;

export type RoomList = z.infer<typeof RoomListSchema>;
