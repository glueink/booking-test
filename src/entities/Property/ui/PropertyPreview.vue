<script setup lang="ts">
defineProps<{
  name: string;
  timezone: string;
  startTimesLocal: string[];
  endTimesLocal: string[];
}>();
</script>

<template>
  <div class="property__item">
    <div>Property name: {{ name }}</div>
    <p>Checkin time:</p>
    <div class="property__time-list">
      <span v-for="time in startTimesLocal" :key="time" class="property__checkin-item"
        >{{ time }}
      </span>
    </div>
    <p>Checkout time:</p>
    <div class="property__time-list">
      <span v-for="time in endTimesLocal" :key="time" class="property__checkout-item">{{
        time
      }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.property__item {
  border: 1px solid plum;
  padding: 10px;
}

.property__time-list {
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
}

.property__checkin-item {
  border: 1px solid limegreen;
}

.property__checkout-item {
  border: 1px solid coral;
}

.property__checkin-item,
.property__checkout-item {
  padding: 3px;
}
</style>
