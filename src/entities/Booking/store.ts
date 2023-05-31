import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { BookingList } from './types';
import { getBookingListApi } from './api';

export const useBookingStore = defineStore('booking', () => {
  const bookingList = ref<BookingList>([]);

  async function getBookingList() {
    const bookings = await getBookingListApi();
    bookingList.value = bookings;
  }

  return { getBookingList, bookingList };
});
