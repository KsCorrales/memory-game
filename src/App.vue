<script setup lang="ts"></script>

<template>
  <div class="relative table">
    <RouterView />
  </div>
</template>

<style scoped>
/* Contenedor principal que simula la mesa de casino */
.table {
  width: 100%;
  height: 100vh;
  background-color: #00cc66; /* Verde claro */
  background-image: radial-gradient(circle at center, #00cc66, #007700); /* Degradado redondo de adentro hacia afuera */
}
</style>
