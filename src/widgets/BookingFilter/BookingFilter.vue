<script lang="ts" setup>
import { z } from 'zod';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { parseDate } from '@/shared';

const router = useRouter();
const route = useRoute();

const localError = ref<string>();

// Ideally, put this code in a schema file
const formSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date()
});

const formData = ref<{
  startDate?: string;
  endDate?: string;
}>({
  startDate: undefined,
  endDate: undefined
});

const startDateMin = parseDate().dateISO;
const endDateMin = computed(() =>
  formData.value.startDate ? parseDate(formData.value.startDate).dateISO : startDateMin
);

function validateQuery() {
  const { startDate, endDate, ...rest } = route.query;

  if (formSchema.safeParse({ startDate, endDate }).success) {
    formData.value.startDate = route.query.startDate?.toString();
    formData.value.endDate = route.query.endDate?.toString();
    return;
  }

  router.replace({ query: rest });
}

validateQuery();

function onChangeStartDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const parsedDate = parseDate(value);
  formData.value.startDate = parsedDate.dateISO;
  if (
    !formData.value.endDate ||
    parsedDate.dateTimestamp > parseDate(formData.value.endDate).dateTimestamp
  ) {
    formData.value.endDate = parsedDate.dateISO;
  }
}

function onChangeEndDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  formData.value.endDate = parseDate(value).dateISO;
}

function onFormSubmit() {
  try {
    localError.value = undefined;
    const valid = formSchema.safeParse(formData.value);
    if (!valid.success) {
      localError.value = 'Enter valid dates';
      return;
    }
    // process data
    router.push({
      query: {
        ...route.query,
        startDate: formData.value.startDate,
        endDate: formData.value.endDate
      }
    });
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <form class="booking-filter" @submit.prevent="onFormSubmit">
    <div>
      <div>
        <p>Start date</p>
        <input
          type="date"
          id="start"
          name="booking-start"
          :value="formData.startDate"
          :min="startDateMin"
          @change="onChangeStartDate"
        />
      </div>
      <div>
        <p>End date</p>
        <input
          type="date"
          id="start"
          name="booking-end"
          :value="formData.endDate"
          :min="endDateMin"
          @change="onChangeEndDate"
        />
      </div>
      <button class="">Submit</button>
    </div>
    <p v-if="localError" class="error">{{ localError }}</p>
  </form>
</template>

<style lang="scss">
.booking-filter {
  border: 1px solid red;
}
</style>
