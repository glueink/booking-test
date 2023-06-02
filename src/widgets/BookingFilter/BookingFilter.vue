<script lang="ts" setup>
import { z } from 'zod';
import { ref, computed } from 'vue';

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

const startDateMin = new Date().toISOString().slice(0, 10);
const endDateMin = computed(() =>
  formData.value.startDate
    ? new Date(formData.value.startDate).toISOString().slice(0, 10)
    : startDateMin
);

function parseDate(value: string): string {
  const dateTest = z.date().parse(new Date(value));
  // error handler or something
  console.log(dateTest.toJSON()); // 2023-05-31T00:00:00.000Z
  console.log(dateTest.toISOString().slice(0, 10)); // 2023-05-31
  return dateTest.toISOString().slice(0, 10);
}

function onChangeStartDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const parsedDate = parseDate(value);
  formData.value.startDate = parsedDate;
  formData.value.endDate = parsedDate;
  console.log('startDate', formData.value.startDate);
}

function onChangeEndDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  formData.value.endDate = parseDate(value);
  console.log('endDate', formData.value.endDate);
}

function onFormSubmit() {
  try {
    const valid = formSchema.parse(formData.value);
    if (!valid) return;
    // process data
    console.log('SUCESS!', formData.value, formData);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <form class="booking-filter" @submit.prevent="onFormSubmit">
    <div>
      <p>Property</p>
    </div>
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
      {{ startDateMin }}
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
      {{ endDateMin }}
    </div>
    <button class="">Submit</button>
  </form>
</template>

<style lang="scss">
.booking-filter {
  background-color: aquamarine;
  display: flex;
}
</style>
