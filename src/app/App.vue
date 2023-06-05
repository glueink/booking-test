<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Main</RouterLink>&nbsp;
        <RouterLink to="/room/1">Current Room</RouterLink>&nbsp;
        <RouterLink to="/success">Success</RouterLink>&nbsp;
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>
