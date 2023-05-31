import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PropertyItem } from './types';
import { getPropertyItemApi } from './api';

export const usePropertyStore = defineStore('property', () => {
  const propertyItem = ref<PropertyItem | null>(null);

  async function getPropertyItem() {
    const property = await getPropertyItemApi();
    propertyItem.value = property;
  }

  return { getPropertyItem, propertyItem };
});
