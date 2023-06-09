<script setup lang="ts">
defineProps<{
  name: string;
  imageSrc: string;
  price: number;
  discount: number;
}>();
</script>

<template>
  <div class="room__item">
    <p>Room name: {{ name }}</p>
    <img :src="imageSrc" alt="" />
    <p>
      <b>Price: {{ price }}</b>
    </p>
    <p v-if="discount">Discount: {{ discount }}</p>
    <div><slot name="actions" /></div>
  </div>
</template>

<style lang="scss">
.room__item {
  border: 1px solid green;
  padding: 10px;
}
</style>
