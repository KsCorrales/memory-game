<script setup lang="ts">
import { LeaderboardRecord } from '@/utils/Types'
const props = defineProps<{
  rows: LeaderboardRecord[]
}>()

function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function difficultyName(difficulty: number): string {
  switch (difficulty) {
    case 1:
      return 'Easy'
    case 2:
      return 'Medium'
    case 3:
      return 'Hard'
    default:
      return 'Unknown'
  }
}
</script>
<template>
  <div class="overflow-x-auto">
    <table class="table-auto min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th class="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Moves</th>
          <th class="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          <th class="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-for="row in rows">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">{{ row['name'] }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ row['moves'] }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatTime(row['time']) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ difficultyName(row['difficulty']) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
