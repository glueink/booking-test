import type { ProductItem, ProductList } from './types';
import { useProductStore } from './store';
import { getProductPriceResult, getProductDiscountResult } from './utils';
import ProductPreview from './ui/ProductPreview.vue';
import ProductPreviewGrid from './ui/ProductPreviewGrid.vue';

export {
  type ProductItem,
  type ProductList,
  useProductStore,
  ProductPreview,
  getProductPriceResult,
  getProductDiscountResult,
  ProductPreviewGrid
};
