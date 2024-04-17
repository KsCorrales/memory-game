import { computed } from "vue";
import { useSettings } from "@/store/settings";

export function useDynamicClasses() {
  const settingsStore = useSettings()

  const gameBoardClasses = computed(() => {
    switch (settingsStore.difficulty) {
      case 3:
        return 'flex justify-center items-center col-span-2'
      case 1:
        return 'flex lg:h-screen justify-center items-center'
      default:
        return 'flex justify-center items-center'
    }
  })

  const gridCardClasses = computed(() => {
    switch (settingsStore.difficulty) {
      case 3:
        return 'grid grid-cols-4 gap-6 lg:grid-rows-4 lg:grid-flow-col lg:gap-4'
      case 2:
        return 'grid grid-rows-4 grid-flow-col gap-4'
      default:
        return 'grid grid-rows-2 grid-cols-4 grid-flow-col gap-4'
    }
  })

  return {
    gameBoardClasses,
    gridCardClasses
  }
}