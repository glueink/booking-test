import { api } from '@/shared';
import { parseBookingList } from './guards';
import type { BookingCheckoutType } from './types';

export const getBookingListApi = async () => {
  const response = await api('/api/bookings.json');
  const data = parseBookingList(response.data);
  return data;
};

export const postNewBooking = async (data: BookingCheckoutType) => {
  return await api('/booking', {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
