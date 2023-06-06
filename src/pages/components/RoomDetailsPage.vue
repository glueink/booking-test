<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoomStore } from '@/entities/Room';
import { useProductStore } from '@/entities/Product';

const route = useRoute();
const roomStore = useRoomStore();
const productStore = useProductStore();

productStore.getProductList();

const currentRoom = computed(() =>
  roomStore.roomList.find((item) => {
    return item.id.toString() === route.params.roomId;
  })
);

const days = 30; // todo fix
</script>

<template>
  <div v-if="currentRoom">
    <h3>Room details</h3>
    <div>Name: {{ currentRoom.name }}</div>
    <img :src="currentRoom.image" alt="" />
    <div>
      Price:
      {{
        currentRoom.pricePerNightNet + currentRoom.pricePerNightNet * currentRoom.priceTaxPercentage
      }}
    </div>

    <h3>Available products</h3>
    <div v-for="product in productStore.productList" :key="product.id">
      <p>{{ product.name }}</p>
      <img :src="product.image" alt="" width="200" />
      <div>
        Price:
        {{ product.priceNet + product.priceNet * product.priceTaxPercentage }}
      </div>
      <div v-if="days > 28">todo breakfest</div>
      <p>{{ product.chargeMethod }}</p>
      <hr />
    </div>
    <h3>Calculated price and discount</h3>
    <button>Book now for: n</button>
  </div>
</template>

<style lang="scss"></style>
