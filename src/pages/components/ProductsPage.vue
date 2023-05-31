<script lang="ts" setup>
import { useProductStore } from '@/entities/Product';

const store = useProductStore();
store.getProductList();
</script>

<template>
  <div class="">Products Page</div>
  <ul>
    <li v-for="product in store.productList" :key="product.id">{{ product }}</li>
  </ul>
</template>

<style lang="scss"></style>
