import { ProductListSchema, type ProductList } from './types';

export function parseProductList(payload: unknown): ProductList {
  const parsedPayload = ProductListSchema.parse(payload);
  return parsedPayload;
}
