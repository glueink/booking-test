import type { RoomItem } from '@/entities/Room';
import { dateRangeOverlaps } from '@/shared';
import type { BookingList } from '.';

function convertData(data?: string) {
  if (!data) {
    return 0;
  }
  return Date.parse(data);
}

export function checkAvailableRoom(
  room: RoomItem,
  bookingList: BookingList,
  startDate: string,
  endDate: string
) {
  const alreadyBookedList = bookingList.filter((item) => item.roomId === room.id);
  return !alreadyBookedList.some((booking) =>
    dateRangeOverlaps(
      convertData(startDate),
      convertData(endDate),
      convertData(booking.startDateUtc),
      convertData(booking.endDateUtc)
    )
  );
}
