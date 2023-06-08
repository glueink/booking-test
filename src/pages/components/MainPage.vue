<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FilterForm } from '@/features/Filter';
import { useRoomStore, type RoomItem, RoomPreview } from '@/entities/Room';
import { useBookingStore, type BookingList } from '@/entities/Booking';
import {
  calculateNights,
  dateRangeOverlaps,
  guardStartEnd,
  calculateDiscount,
  calculatePrice
} from '@/shared';

const router = useRouter();
const route = useRoute();

const roomStore = useRoomStore();
roomStore.getRoomList();

const bookingStore = useBookingStore();
bookingStore.getBookingList();

const filter = ref<{ startDate: string; endDate: string }>();

const nights = computed(() => {
  const { startDate, endDate } = filter.value || {};
  return calculateNights(startDate, endDate);
});

function convertData(data?: string) {
  if (!data) {
    return 0;
  }
  return Date.parse(data);
}

function checkAvailableRoom(
  room: RoomItem,
  bookingList: BookingList,
  startDate: string,
  endDate: string
) {
  const alreadyBookedList = bookingList.filter((item) => item.roomId === room.id); // rename
  return !alreadyBookedList.some((booking) =>
    dateRangeOverlaps(
      convertData(startDate),
      convertData(endDate),
      convertData(booking.startDateUtc),
      convertData(booking.endDateUtc)
    )
  );
}

const availableRoomsList = computed(() => {
  if (!filter.value) {
    return [];
  }
  const { startDate, endDate } = filter.value;
  return [...roomStore.roomList].filter((item) =>
    checkAvailableRoom(item, bookingStore.bookingList, startDate, endDate)
  );
});

function handleBookNow(room: RoomItem) {
  const { id } = room;

  router.push({
    name: 'roomDetails',
    params: { roomId: id.toString() },
    query: filter.value
  });
}

function handleFilterSubmit(payload: { startDate: string; endDate: string }) {
  filter.value = payload;
  router.push({
    query: filter.value
  });
}

watch(
  () => route.query,
  (value) => {
    const { startDate, endDate, ...rest } = value;
    const dates = guardStartEnd(startDate, endDate);
    if (dates) {
      filter.value = dates;
      return;
    }
    router.replace({ query: rest });
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <FilterForm :filter="filter" @submit="handleFilterSubmit" />
  <ul v-if="availableRoomsList.length > 0 && filter" class="room-list">
    <li v-for="room in availableRoomsList" :key="room.id" class="room-list__item">
      <RoomPreview
        :name="room.name"
        :image-src="room.image"
        :price="calculatePrice(room.pricePerNightNet, room.priceTaxPercentage)"
        :discount="
          calculateDiscount(calculatePrice(room.pricePerNightNet, room.priceTaxPercentage), nights)
        "
      />
      <button @click="handleBookNow(room)">Book Now</button>
    </li>
  </ul>
</template>

<style lang="scss">
.room-list {
  display: grid;
  margin: 0;
  padding: 0;
  &__item {
    display: grid;
    border: 1px solid black;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
