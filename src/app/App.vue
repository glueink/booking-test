<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">© Jegor Šalajev</RouterLink>
    </nav>
  </header>
  <br />
  <RouterView />
</template>

<style scoped></style>
