<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoomStore } from '@/entities/Room';
import { useProductStore, ProductPreview } from '@/entities/Product';
import { calculatePrice } from '@/shared';

const route = useRoute();
const roomStore = useRoomStore();
const productStore = useProductStore();

productStore.getProductList();

const currentRoom = computed(() =>
  roomStore.roomList.find((item) => {
    return item.id.toString() === route.params.roomId;
  })
);

const nights = 30; // todo fix

type formData = {
  startDate: string;
  endDate: string;
  roomId: number;
  productIds: number[];
};

function onFormSubmit() {
  try {
    console.log('');
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div v-if="currentRoom">
    <form @submit.prevent="onFormSubmit">
      <div>Name: {{ currentRoom.name }}</div>
      <img :src="currentRoom.image" alt="" />
      <div>
        Price:
        {{
          currentRoom.pricePerNightNet +
          currentRoom.pricePerNightNet * currentRoom.priceTaxPercentage
        }}
      </div>

      <h3>Available products</h3>
      <div v-for="product in productStore.productList" :key="product.id">
        <ProductPreview
          :name="product.name"
          :charge-method="product.chargeMethod"
          :image="product.image"
          :price="calculatePrice(product.priceNet, product.priceTaxPercentage)"
        >
          <template #actions>
            <input :name="product.name" type="checkbox" />
          </template>
        </ProductPreview>
      </div>
      <div>todo breakfest</div>
      <h3>Calculated price and discount</h3>
      <button>Book now for: n</button>
    </form>
  </div>
</template>

<style lang="scss"></style>
