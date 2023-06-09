<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { guardStartEnd, parseDate } from '@/shared';

const emit = defineEmits<{
  (
    e: 'submit',
    payload: {
      startDate: string;
      endDate: string;
    }
  ): void;
}>();

const props = defineProps<{
  filter?: {
    startDate: string;
    endDate: string;
  };
}>();

const localError = ref<string>();
const startDate = ref<string | undefined>(props.filter?.startDate);
const endDate = ref<string | undefined>(props.filter?.endDate);
const startDateMin = parseDate(new Date()).iso;
const endDateMin = computed(() =>
  startDate.value ? parseDate(startDate.value).iso : startDateMin
);

watch(
  () => props.filter,
  () => {
    startDate.value = props.filter?.startDate;
    endDate.value = props.filter?.endDate;
  }
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
    const dates = guardStartEnd(startDate.value, endDate.value);
    if (!dates) {
      localError.value = 'Enter valid dates';
      return;
    }

    emit('submit', {
      startDate: dates.startDate,
      endDate: dates.endDate
    });
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <form class="booking-filter" @submit.prevent="onFormSubmit">
    <div class="booking-filter__container">
      <div class="booking-filter__input-wrapper">
        <label>Start date</label>
        <input
          type="date"
          id="start"
          name="booking-start"
          :value="startDate"
          :min="startDateMin"
          @change="onChangeStartDate"
        />
      </div>
      <div class="booking-filter__input-wrapper">
        <label>End date</label>
        <input
          type="date"
          id="start"
          name="booking-end"
          :value="endDate"
          :min="endDateMin"
          @change="onChangeEndDate"
        />
      </div>
      <button type="submit">Submit</button>
    </div>
    <p v-if="localError" class="error">{{ localError }}</p>
  </form>
</template>

<style lang="scss">
.booking-filter {
  display: inline-block;
  border: 1px solid red;
  &__container {
    display: flex;
    gap: 10px;
  }
  &__input-wrapper {
    display: grid;
  }
}
</style>
