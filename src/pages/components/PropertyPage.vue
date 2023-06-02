<script lang="ts" setup>
import { usePropertyStore } from '@/entities/Property';

const store = usePropertyStore();
store.getPropertyItem();
</script>

<template>
  <template v-if="store.propertyItem">
    <b>{{ store.propertyItem.name }}</b>
    <div>CheckIn time</div>
    <ul>
      <li v-for="(item, index) in store.propertyItem.startTimesLocal" :key="index">{{ item }}</li>
    </ul>
    <div>CheckOut time</div>
    <ul>
      <li v-for="(item, index) in store.propertyItem.endTimesLocal" :key="index">{{ item }}</li>
    </ul>
  </template>
</template>

<style lang="scss"></style>
