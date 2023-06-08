<script setup lang="ts">
import type { ChargeMethod } from '../types';

defineProps<{
  name: string;
  price: number;
  chargeMethod: ChargeMethod;
  image: string;
}>();
</script>

<template>
  <div class="product__item">
    <div>Name: {{ name }}</div>
    <img :src="image" alt="" width="100" />
    <div>Price: {{ price }}</div>
    <div v-if="chargeMethod">Charge Method: {{ chargeMethod }}</div>
    <div><slot name="actions" /></div>
  </div>
</template>

<style lang="scss">
.product__item {
  border: 1px solid green;
}
</style>
