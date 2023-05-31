<script lang="ts" setup>
import { usePropertyStore } from '@/entities/Property';

const store = usePropertyStore();
store.getPropertyItem();
</script>

<template>
  <div class="">Property Page</div>
  <div class="">{{ store.propertyItem }}</div>
</template>

<style lang="scss"></style>
