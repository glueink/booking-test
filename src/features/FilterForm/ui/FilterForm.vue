<script lang="ts" setup>
import { ref, computed } from 'vue';
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

const startDate = ref<string>();
const endDate = ref<string>();

const localError = ref<string>();
const startDateMin = parseDate(new Date()).iso;
const endDateMin = computed(() =>
  startDate.value ? parseDate(startDate.value).iso : startDateMin
);

function onChangeStartDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const parsedDate = parseDate(value);
  startDate.value = parsedDate.iso;
  if (!endDate.value || parsedDate.timestamp > parseDate(endDate.value).timestamp) {
    endDate.value = parsedDate.iso;
  }
}

function onChangeEndDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  endDate.value = parseDate(value).iso;
}

function onFormSubmit() {
  try {
    localError.value = undefined;
    if (!startDate.value || !endDate.value) {
      localError.value = 'Enter valid dates';
      return;
    }
    const start = parseDate(startDate.value);
    const end = parseDate(endDate.value);

    emit('submit', {
      startDate: start.iso,
      endDate: end.iso
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
          :value="startDate"
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
          :value="endDate"
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
