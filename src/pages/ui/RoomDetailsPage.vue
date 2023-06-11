<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { checkAvailableRoom, useBookingStore } from '@/features/Booking';
import { FilterForm, useFilter, type FilterType } from '@/features/Filter';
import { usePropertyStore, PropertyPreview } from '@/entities/Property';
import { useRoomStore, RoomPreview, getRoomPriceResult } from '@/entities/Room';
import {
  useProductStore,
  ProductPreview,
  ProductPreviewGrid,
  getProductPriceResult
} from '@/entities/Product';
import { calculatePrice, calculateDiscount, calculateNights, PageRoutes } from '@/shared';

const route = useRoute();
const router = useRouter();

const { filter, handleFilterChange } = useFilter();

const roomStore = useRoomStore();
roomStore.getRoomList();

const productStore = useProductStore();
productStore.getProductList();

const propertyStore = usePropertyStore();
propertyStore.getPropertyItem();

const bookingStore = useBookingStore();
bookingStore.getBookingList();

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

const productIds = ref<number[]>([]);

function resetForm() {
  productIds.value = [];
}

function onFilterSubmit(payload: FilterType) {
  handleFilterChange(payload);
  resetForm();
}

async function onFormSubmit() {
  // guarantees filter & currentRoom
  if (!isRoomAvailable.value) {
    return;
  }
  bookingStore
    .createNewBooking({
      endDate: filter.value!.endDate,
      startDate: filter.value!.startDate,
      productIdList: nights.value >= 28 ? [1, ...productIds.value] : [...productIds.value], // discount for breakfast
      roomId: currentRoom.value!.id
    })
    // replace catch if need to stop propogation
    // .catch((e) => {
    //   throw e;
    // })
    .catch(() => {})
    .then(() => {
      resetForm();
      router.push({ name: PageRoutes.SUCCESS });
    });
}

const calculatedProductsPrice = computed(() => {
  return productStore.productList.reduce((acc, current) => {
    if (productIds.value.includes(current.id)) {
      return acc + getProductPriceResult(current, nights.value);
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
</script>

<template>
  <FilterForm class="filter" :filter="filter" @submit="onFilterSubmit($event)" />
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
      <form @submit.prevent="onFormSubmit">
        <h4>Available products</h4>
        <ProductPreviewGrid>
          <ProductPreview
            v-for="product in productStore.productList"
            :key="product.id"
            :name="product.name"
            :charge-method="product.chargeMethod"
            :image="product.image"
            :price="calculatePrice(product.priceNet, product.priceTaxPercentage)"
          >
            <template #actions>
              <label v-if="nights >= 28 && product.id === 1">Free</label>
              <label v-else>
                Select:
                <input
                  :name="product.name"
                  type="checkbox"
                  :value="product.id"
                  v-model="productIds"
                />
              </label>
            </template>
          </ProductPreview>
        </ProductPreviewGrid>
        <br />
        <h4>Nights: {{ nights }}</h4>
        <p>Room total price: {{ calculatedRoomsPrice.toFixed(2) }}</p>
        <p v-if="calculatedProductsPrice">
          Products total price: {{ calculatedProductsPrice.toFixed(2) }}
        </p>
        <button>
          Book now for {{ (calculatedRoomsPrice + calculatedProductsPrice).toFixed(2) }}
        </button>
      </form>
    </section>
  </div>
  <div v-else>Room is not available</div>
</template>
