import { BookingListSchema, type BookingList } from './types';

export function parseBookingList(payload: unknown): BookingList {
  const parsedPayload = BookingListSchema.parse(payload);
  return parsedPayload;
}
