<script setup lang="ts">
import type { ChargeMethod } from '../types';

defineProps<{
  name: string;
  price: number;
  chargeMethod: ChargeMethod;
  image: string;
  isFree?: boolean;
}>();
</script>

<template>
  <span class="product__item">
    <p>Name: {{ name }}</p>
    <img :src="image" alt="" class="product__image" />
    <p v-if="chargeMethod">Charge Method: {{ chargeMethod }}</p>
    <p>
      <b>Price: {{ price }}</b>
    </p>
    <p v-if="isFree">
      <b>Free!</b>
    </p>
    <div v-if="$slots.actions"><slot name="actions" /></div>
  </span>
</template>

<style lang="scss">
.product {
  &__item {
    display: grid;
    border: 1px solid lightblue;
    padding: 10px;
  }

  &__image {
    display: block;
    width: 100%;
  }
}
</style>
