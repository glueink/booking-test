<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { checkAvailableRoom, useBookingStore } from '@/features/Booking';
import { FilterForm, useFilter } from '@/features/Filter';
import { usePropertyStore, PropertyPreview } from '@/entities/Property';
import { useRoomStore, RoomPreview } from '@/entities/Room';
import { useProductStore, ProductPreview } from '@/entities/Product';
import { calculatePrice, calculateDiscount, calculateNights } from '@/shared';
import { useCheckoutStore } from '@/features/Checkout';

const route = useRoute();
const { filter, handleFilterChange } = useFilter();

const roomStore = useRoomStore();
roomStore.getRoomList();

const productStore = useProductStore();
productStore.getProductList();

const propertyStore = usePropertyStore();
propertyStore.getPropertyItem();

const bookingStore = useBookingStore();
bookingStore.getBookingList();

const checkoutStore = useCheckoutStore();

const currentRoom = computed(() =>
  roomStore.roomList.find((item) => {
    return item.id.toString() === route.params.roomId;
  })
);

const isRoomAvailable = computed(() => {
  if (!filter.value || !currentRoom.value) {
    return false;
  }
  const { startDate, endDate } = filter.value;
  return checkAvailableRoom(currentRoom.value, bookingStore.bookingList, startDate, endDate);
});

const nights = computed(() => {
  const { startDate, endDate } = filter.value || {};
  return calculateNights(startDate, endDate);
});

type formData = {
  startDate: string;
  endDate: string;
  roomId: number;
  productIds: number[];
};

function onFormSubmit() {
  try {
    if (!filter.value) {
      return;
    }
    checkoutStore.doCheckout({
      endDate: filter.value?.endDate,
      startDate: filter.value?.startDate,
      productIdList: [],
      roomId: 1
    });
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <FilterForm class="filter" :filter="filter" @submit="handleFilterChange" />
  <div v-if="currentRoom && filter && isRoomAvailable">
    <section>
      <h4>Room details</h4>
      <RoomPreview
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
    </section>
    <br />
    <section>
      <h4>Property</h4>
      <PropertyPreview
        v-if="propertyStore.propertyItem"
        :name="propertyStore.propertyItem.name"
        :timezone="propertyStore.propertyItem.timezone"
        :start-times-local="propertyStore.propertyItem.startTimesLocal"
        :end-times-local="propertyStore.propertyItem.endTimesLocal"
      />
    </section>
    <br />
    <section>
      <h4>Available products</h4>
      <div class="product-grid">
        <ProductPreview
          v-for="product in productStore.productList"
          :key="product.id"
          :name="product.name"
          :charge-method="product.chargeMethod"
          :image="product.image"
          :price="calculatePrice(product.priceNet, product.priceTaxPercentage)"
        >
          <template #actions>
            <label>
              Select:
              <input :name="product.name" type="checkbox" />
            </label>
          </template>
        </ProductPreview>
      </div>
    </section>
    <br />
    <form @submit.prevent="onFormSubmit">
      Nights: {{ nights }}
      <div>todo breakfest</div>
      <h3>Calculated price and discount</h3>
      <button>Book now for 'price'</button>
    </form>
  </div>
  <div v-else>Room is not available</div>
</template>

<style lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
}
</style>
