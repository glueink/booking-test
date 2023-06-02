<script lang="ts" setup>
import { BookingFilter } from '@/widgets/BookingFilter';
</script>

<template>
  <BookingFilter />
  <div class="room-list">
    <div class="room-item">room 1</div>
    <div class="room-item">room 2</div>
    <div class="room-item">room 3</div>
  </div>
  <div class="room-detail">
    <p>name</p>
    <p>price = (night * nightPrice) + tax</p>
    <img src="" alt="" />
  </div>
</template>

<style lang="scss"></style>
