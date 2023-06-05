<script lang="ts" setup>
import { z } from 'zod';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { parseDate } from '@/shared';

const emit = defineEmits<{
  (
    e: 'submit',
    payload: {
      startDate: string;
      endDate: string;
    }
  ): void;
}>();

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

const startDateMin = parseDate(new Date()).iso;
const endDateMin = computed(() =>
  formData.value.startDate ? parseDate(formData.value.startDate).iso : startDateMin
);

function validateQuery() {
  const { startDate, endDate, ...rest } = route.query;

  if (startDate && endDate && formSchema.safeParse({ startDate, endDate }).success) {
    formData.value.startDate = parseDate(startDate.toString()).iso;
    formData.value.endDate = parseDate(endDate.toString()).iso;
    return;
  }

  router.replace({ query: rest });
}

validateQuery();

function onChangeStartDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const parsedDate = parseDate(value);
  formData.value.startDate = parsedDate.iso;
  if (
    !formData.value.endDate ||
    parsedDate.timestamp > parseDate(formData.value.endDate).timestamp
  ) {
    formData.value.endDate = parsedDate.iso;
  }
}

function onChangeEndDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  formData.value.endDate = parseDate(value).iso;
}

function onFormSubmit() {
  try {
    localError.value = undefined;
    const valid = formSchema.safeParse(formData.value);
    const { startDate, endDate } = formData.value;
    if (valid.success && startDate && endDate) {
      emit('submit', {
        startDate,
        endDate
      });
      router.replace({
        query: {
          startDate,
          endDate
        }
      });
    } else {
      localError.value = 'Enter valid dates';
    }
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
