import { api } from '@/shared';
import { parseBookingList } from './guards';

export const getBookingListApi = async () => {
  const response = await api('/api/bookings.json');
  const data = parseBookingList(response.data);
  return data;
};
