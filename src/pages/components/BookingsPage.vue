<script lang="ts" setup>
import { useBookingStore } from '@/entities/Booking';

const store = useBookingStore();
store.getBookingList();
</script>

<template>
  <div class="">Bookings Page</div>
  <ul>
    <li v-for="booking in store.bookingList" :key="booking.id">{{ booking }}</li>
  </ul>
</template>

<style lang="scss"></style>
