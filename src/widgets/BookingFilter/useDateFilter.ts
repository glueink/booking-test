import { ref } from 'vue';
import { useRoute, type LocationQuery } from 'vue-router';
import { z } from 'zod';
import { parseDate } from '@/shared';

const formSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date()
});

type DateFilter = z.infer<typeof formSchema>;

export function useDateFilter() {
  const route = useRoute();
  const filter = ref<DateFilter>();

  function validateUrlDate(): LocationQuery {
    const { startDate, endDate, ...rest } = route.query;

    if (startDate && endDate && formSchema.safeParse({ startDate, endDate }).success) {
      filter.value = {
        startDate: parseDate(startDate.toString()).date,
        endDate: parseDate(endDate.toString()).date
      };
      return route.query;
    }
    return rest;
  }

  return { filter, validateUrlDate };
}
