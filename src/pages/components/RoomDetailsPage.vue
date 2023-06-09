<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertyStore, PropertyPreview } from '@/entities/Property';
import { useRoomStore, RoomPreview } from '@/entities/Room';
import { useProductStore, ProductPreview } from '@/entities/Product';
import { calculatePrice, calculateDiscount } from '@/shared';

const route = useRoute();
const roomStore = useRoomStore();

const productStore = useProductStore();
productStore.getProductList();

const propertyStore = usePropertyStore();
propertyStore.getPropertyItem();

const currentRoom = computed(() =>
  roomStore.roomList.find((item) => {
    return item.id.toString() === route.params.roomId;
  })
);

const nights = 30; // calculate nights

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

    <form @submit.prevent="onFormSubmit">
      <div>todo breakfest</div>
      <h3>Calculated price and discount</h3>
      <button>Book now for: n</button>
    </form>
  </div>
</template>

<style lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
}
</style>
