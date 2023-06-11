<script setup lang="ts">
defineProps<{
  name: string;
  imageSrc: string;
  price: number;
  discount?: number;
}>();
</script>

<template>
  <div class="room__item">
    <p>Room name: {{ name }}</p>
    <img class="room__img" :src="imageSrc" alt="" />
    <p>
      <b>Price: {{ price }}</b>
    </p>
    <p v-if="discount">Discount: {{ discount }}</p>
    <div v-if="$slots.actions"><slot name="actions" /></div>
  </div>
</template>

<style lang="scss">
.room {
  &__item {
    display: grid;
    border: 1px solid green;
    padding: 10px;
  }
  &__img {
    width: 100%;
    max-width: 400px;
  }
}
</style>
