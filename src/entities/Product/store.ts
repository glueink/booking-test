import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProductList } from './types';
import { getProductListApi } from './api';

export const useProductStore = defineStore('product', () => {
  const productList = ref<ProductList>([]);

  async function getProductList() {
    const products = await getProductListApi();
    productList.value = products;
  }

  return { getProductList, productList };
});
