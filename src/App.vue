<script setup lang="ts">
import { useSettings } from './store/settings'

const settingsStore = useSettings()
</script>

<template>
  <div class="justify-center flex items-center h-screen">
    <div class="relative">
      <div class="justify-center mb-12">
        <h1 class="text-5xl">Memory Game</h1>
      </div>

      <div class="grid grid-cols-1 gap-2">
        <button
          class="px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        >
          Start
        </button>

        <button class="menu-button" @click="settingsStore.addDifficulty">Difficulty: {{ settingsStore.difficultyName }}</button>

        <button class="menu-button" @click="settingsStore.updateSoundSetting">Sound: {{ settingsStore.soundName }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-button {
  /* applying Tailwind style classes */
  @apply px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300;
}
</style>
