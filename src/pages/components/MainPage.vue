<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FilterForm } from '@/features/FilterForm';
import { useRoomStore, type RoomItem } from '@/entities/Room';
import { useBookingStore, type BookingList } from '@/entities/Booking';
import { dateRangeOverlaps } from '@/shared';

const router = useRouter();
const route = useRoute();

const roomStore = useRoomStore();
roomStore.getRoomList();

const bookingStore = useBookingStore();
bookingStore.getBookingList();

const filter = ref<{ startDate: string; endDate: string }>();

const nights = computed(() => {
  const { startDate, endDate } = filter.value || {};
  return ~~((convertData(endDate) - convertData(startDate)) / 1000 / 60 / 60 / 24) || 1; // min 1
});

// todo add price
// todo fix discount for price
function discount(number: number, nights: number) {
  if (nights >= 3) {
    return ~~((number * 5) / 100);
  }
  return 0;
}

function convertData(data: string | undefined) {
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
  const overlappedBooking = bookingList.filter((item) => item.roomId === room.id); // rename

  return !overlappedBooking.some((booking) =>
    dateRangeOverlaps(
      convertData(startDate),
      convertData(endDate),
      convertData(booking.startDateUtc),
      convertData(booking.endDateUtc)
    )
  );
}

const availableRoomsList = computed(() => {
  // todo add real filter
  if (!filter.value) {
    return [];
  }
  const { startDate, endDate } = filter.value;
  // moked data
  return [...roomStore.roomList].filter((item) =>
    checkAvailableRoom(item, bookingStore.bookingList, startDate, endDate)
  );
});

function handleBookNow(room: RoomItem) {
  console.log(room);
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
  () => {
    // check url and set time here
    const { startDate, endDate } = route.query;
    if (startDate && endDate) {
      filter.value = {
        startDate: startDate.toString(),
        endDate: endDate.toString()
      };
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <FilterForm @submit="handleFilterSubmit" />
  <ul v-if="availableRoomsList.length > 0 && filter" class="room-list">
    <li v-for="room in availableRoomsList" :key="room.id" class="room-list__item">
      <div class="">
        <div>Name: {{ room.name }}</div>
        <img :src="room.image" alt="" />
        <div>
          Price: {{ room.pricePerNightNet + room.pricePerNightNet * room.priceTaxPercentage }}
        </div>

        <div>
          Discount:
          {{
            discount(
              room.pricePerNightNet + room.pricePerNightNet * room.priceTaxPercentage,
              nights
            )
          }}
        </div>
      </div>
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
