<script setup lang="ts">
defineProps<{
  name: string;
  imageSrc: string;
  price: number;
  discount: number;
}>();
</script>

<template>
  <div class="">
    <div>Name: {{ name }}</div>
    <img :src="imageSrc" alt="" />
    <div>Price: {{ price }}</div>

    <div v-if="discount">
      Discount:
      {{ discount }}
    </div>
  </div>
  <div>
    <slot name="actions" />
  </div>
</template>
