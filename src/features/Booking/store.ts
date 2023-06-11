import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type BookingList, type BookingCheckoutType, BookingCheckoutSchema } from './types';
import { getBookingListApi, postNewBooking } from './api';

export const useBookingStore = defineStore('booking', () => {
  const bookingList = ref<BookingList>([]); // already booked
  const bookingCheckout = ref<BookingCheckoutType | null>(null);
  const isCheckoutAvailable = ref(false);

  async function getBookingList() {
    const bookings = await getBookingListApi();
    bookingList.value = [...bookings];
  }

  async function createNewBooking(payload: BookingCheckoutType) {
    try {
      bookingCheckout.value = BookingCheckoutSchema.parse(payload);
      isCheckoutAvailable.value = true;
      // expected error
      await postNewBooking({
        startDate: new Date(payload.startDate).toISOString(),
        endDate: new Date(payload.endDate).toISOString(),
        roomId: payload.roomId,
        productIdList: payload.productIdList
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  return { getBookingList, bookingList, bookingCheckout, isCheckoutAvailable, createNewBooking };
});
