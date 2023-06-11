<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { addStringDateDays, parseDate } from '@/shared';
import { validateFilter } from '../utils';
import { type FilterType } from '../types';

const emit = defineEmits<{
  (e: 'submit', payload: FilterType): void;
}>();

const props = defineProps<{
  filter?: FilterType;
}>();

const localError = ref<string>();
const startDate = ref<string | undefined>(props.filter?.startDate);
const endDate = ref<string | undefined>(props.filter?.endDate);
const startDateMin = parseDate(new Date()).iso;
const endDateMin = computed(() => {
  if (startDate.value) {
    return parseDate(addStringDateDays(startDate.value, 1)).iso;
  }
  return parseDate(addStringDateDays(startDateMin, 1)).iso;
});

watch(
  () => props.filter,
  () => {
    startDate.value = props.filter?.startDate;
    endDate.value = props.filter?.endDate;
  }
);

function onChangeStartDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const parsedStartDate = parseDate(value);
  startDate.value = parsedStartDate.iso;
  const parsedEndDateNew = parseDate(addStringDateDays(startDate.value, 1));
  if (!endDate.value || parseDate(endDate.value).timestamp < parsedEndDateNew.timestamp) {
    endDate.value = parsedEndDateNew.iso;
  }
}

function onChangeEndDate(event: Event) {
  const { value } = event.target as HTMLInputElement;
  endDate.value = parseDate(value).iso;
}

function onFormSubmit() {
  try {
    localError.value = undefined;
    const dates = validateFilter(startDate.value, endDate.value);
    if (!dates) {
      localError.value = 'Enter valid dates';
      return;
    }

    emit('submit', {
      startDate: dates.startDate,
      endDate: dates.endDate
    });
  } catch (err) {
    console.error(err);
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
    flex-flow: row wrap;
    gap: 10px;
  }
  &__input-wrapper {
    display: grid;
  }
}
</style>
