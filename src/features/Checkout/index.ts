import { defineStore } from 'pinia';
import { ref } from 'vue';
import { z } from 'zod';
import { isoDateSchema } from '@/shared';

export const CheckoutSchema = z.object({
  startDate: isoDateSchema,
  endDate: isoDateSchema,
  roomId: z.number(),
  productIdList: z.array(z.number())
});

export type CheckoutType = z.infer<typeof CheckoutSchema>;

export const useCheckoutStore = defineStore('checkout', () => {
  const checkout = ref<CheckoutType | null>();
  const isAvailable = ref(false);

  async function doCheckout(payload: CheckoutType) {
    try {
      checkout.value = CheckoutSchema.parse(payload);
      isAvailable.value = true;
      // make api call
      // const response = await Promise.resolve();
    } catch (err) {
      console.error(err);
    }
  }

  return { isAvailable, doCheckout };
});
