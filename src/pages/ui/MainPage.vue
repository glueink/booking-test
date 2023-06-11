<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { FilterForm, useFilter } from '@/features/Filter';
import { useRoomStore, type RoomItem, RoomPreview } from '@/entities/Room';
import { useBookingStore, checkAvailableRoom } from '@/features/Booking';
import { calculateNights, calculateDiscount, calculatePrice, PageRoutes } from '@/shared';

const router = useRouter();
const { filter, handleFilterChange } = useFilter();

const roomStore = useRoomStore();
roomStore.getRoomList();

const bookingStore = useBookingStore();
bookingStore.getBookingList();

const nights = computed(() => {
  const { startDate, endDate } = filter.value || {};
  return calculateNights(startDate, endDate);
});

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
    name: PageRoutes.ROOM_DETAILS,
    params: { roomId: id.toString() },
    query: filter.value
  });
}
</script>

<template>
  <FilterForm class="filter" :filter="filter" @submit="handleFilterChange" />
  <h4>Room list</h4>
  <ul v-if="availableRoomsList.length > 0 && filter" class="room-list">
    <li v-for="room in availableRoomsList" :key="room.id" class="room-list__item">
      <RoomPreview
        :name="room.name"
        :image-src="room.image"
        :price="calculatePrice(room.pricePerNightNet, room.priceTaxPercentage)"
        :discount="
          calculateDiscount(calculatePrice(room.pricePerNightNet, room.priceTaxPercentage), nights)
        "
      >
        <template #actions>
          <button @click="handleBookNow(room)">Book Now</button>
        </template>
      </RoomPreview>
    </li>
  </ul>
  <div v-else>No results</div>
</template>

<style lang="scss">
.filter {
  margin-bottom: 10px;
}

.room-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;

  &__item {
    display: block;
  }
}
</style>
