<template>
  <div class="product-grid">
    <slot />
  </div>
</template>

<style lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
}
</style>
