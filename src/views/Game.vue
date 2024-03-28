<script setup lang="ts">
import { useSettings } from '../store/settings'

const settingsStore = useSettings()
</script>
<template>
  <div class="justify-center mb-12">
    <h1 class="text-5xl">Game</h1>
  </div>

  <div class="grid grid-cols-1 gap-2"></div>
</template>
