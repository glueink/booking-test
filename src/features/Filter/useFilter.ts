import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validateFilter } from './utils';
import { type FilterType } from './types';

/**
 *  1 instance per page or might be collisions
 */
export function useFilter() {
  const router = useRouter();
  const route = useRoute();

  const filter = ref<FilterType>();

  watch(
    () => route.query,
    (value) => {
      const { startDate, endDate, ...rest } = value;
      const dates = validateFilter(startDate, endDate);
      if (dates) {
        filter.value = dates;
        return;
      }
      filter.value = undefined;
      router.replace({ query: rest });
    },
    { immediate: true, deep: true }
  );

  function handleFilterChange(payload: { startDate: string; endDate: string }) {
    filter.value = payload;
    router.push({
      query: filter.value
    });
  }

  return {
    filter,
    handleFilterChange
  };
}
