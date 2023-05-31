<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Main</RouterLink>&nbsp;
        <RouterLink to="/bookings">Bookings</RouterLink>&nbsp;
        <RouterLink to="/products">Products</RouterLink>&nbsp;
        <RouterLink to="/property">Property</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
