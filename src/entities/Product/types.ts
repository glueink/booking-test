import { z } from 'zod';

export enum ChargeMethod {
  NIGHTLY = 'nightly',
  ONCE_PER_BOOKING = 'once-per-booking'
}

export const ProductItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  priceNet: z.number(),
  priceTaxPercentage: z.number(),
  chargeMethod: z.nativeEnum(ChargeMethod),
  image: z.string()
});

export const ProductListSchema = z.array(ProductItemSchema);

export type ProductItem = z.infer<typeof ProductItemSchema>;

export type ProductList = z.infer<typeof ProductListSchema>;
