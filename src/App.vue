<script setup lang="ts"></script>

<template>
  <div class="relative table">
    <RouterView />
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  height: 100vh;
  background-color: #00cc66;
  background-image: radial-gradient(circle at center, #00cc66, #007700);
}
</style>
