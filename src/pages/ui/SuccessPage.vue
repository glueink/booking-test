<script lang="ts" setup>
import { computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useBookingStore } from '@/features/Booking';
import {
  useRoomStore,
  RoomPreview,
  getRoomPriceResult,
  getRoomDiscountResult
} from '@/entities/Room';
import {
  useProductStore,
  ProductPreviewGrid,
  ProductPreview,
  getProductPriceResult,
  getProductDiscountResult
} from '@/entities/Product';
import { calculatePrice, calculateNights, calculateDiscount } from '@/shared';

const bookingStore = useBookingStore();
const roomStore = useRoomStore();
const productStore = useProductStore();

const currentRoom = computed(() =>
  roomStore.roomList.find((item) => {
    return item.id === bookingStore.bookingCheckout?.roomId;
  })
);

const selectedProducts = computed(() =>
  productStore.productList.filter((item) => {
    return bookingStore.bookingCheckout?.productIdList.includes(item.id);
  })
);

const nights = computed(() => {
  const { startDate, endDate } = bookingStore.bookingCheckout || {};
  return calculateNights(startDate, endDate);
});

const calculatedProductsPrice = computed(() => {
  return productStore.productList.reduce((acc, current) => {
    if (bookingStore.bookingCheckout?.productIdList.includes(current.id)) {
      return acc + getProductPriceResult(current, nights.value);
    }
    return acc;
  }, 0);
});

const calculatedProductsDiscount = computed(() => {
  return productStore.productList.reduce((acc, current) => {
    if (bookingStore.bookingCheckout?.productIdList.includes(current.id)) {
      return acc + getProductDiscountResult(current, nights.value);
    }
    return acc;
  }, 0);
});

const calculatedRoomsPrice = computed(() => {
  if (!currentRoom.value) {
    return 0;
  }
  return getRoomPriceResult(currentRoom.value, nights.value);
});

const calculatedRoomsDiscount = computed(() => {
  if (!currentRoom.value) {
    return 0;
  }
  return getRoomDiscountResult(currentRoom.value, nights.value);
});

onBeforeRouteLeave(() => {
  bookingStore.$patch({
    isCheckoutAvailable: false
  });
});
</script>

<template>
  <h2>Success, you have booked a room!</h2>
  <br />
  <p>End date: {{ bookingStore.bookingCheckout?.endDate }}</p>
  <p>Start date: {{ bookingStore.bookingCheckout?.startDate }}</p>
  <p>Nights: {{ nights }}</p>
  <p>Room:</p>
  <RoomPreview
    v-if="currentRoom"
    :name="currentRoom.name"
    :image-src="currentRoom.image"
    :price="calculatePrice(currentRoom.pricePerNightNet, currentRoom.priceTaxPercentage)"
    :discount="
      calculateDiscount(
        calculatePrice(currentRoom.pricePerNightNet, currentRoom.priceTaxPercentage),
        nights
      )
    "
  />
  <template v-if="selectedProducts.length > 0">
    <p>Products:</p>
    <ProductPreviewGrid>
      <ProductPreview
        v-for="product in selectedProducts"
        :key="product.id"
        :name="product.name"
        :charge-method="product.chargeMethod"
        :image="product.image"
        :price="calculatePrice(product.priceNet, product.priceTaxPercentage)"
        :is-free="product.id === 1 && nights >= 28"
      />
    </ProductPreviewGrid>
  </template>
  <br />
  <p v-if="calculatedRoomsPrice">
    Room price: <b>{{ calculatedRoomsPrice.toFixed(2) }}</b>
  </p>
  <p v-if="calculatedProductsPrice">
    Product price: <b>{{ calculatedProductsPrice.toFixed(2) }}</b>
  </p>
  <u
    >Price total: <b>{{ (calculatedRoomsPrice + calculatedProductsPrice).toFixed(2) }}</b></u
  >
  <br />
  <br />
  <p v-if="calculatedRoomsDiscount">
    Saved on room: <b>{{ calculatedRoomsDiscount.toFixed(2) }}</b>
  </p>
  <p v-if="calculatedProductsDiscount">
    Saved on products:<b>{{ calculatedProductsDiscount.toFixed(2) }}</b>
  </p>
  <u v-if="calculatedRoomsDiscount + calculatedProductsDiscount">
    Saved total:
    <b>{{ (calculatedRoomsDiscount + calculatedProductsDiscount).toFixed(2) }}</b>
  </u>
</template>
