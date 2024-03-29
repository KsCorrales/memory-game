import { ref, computed, onBeforeUnmount } from 'vue';


export function useTimer() {
  const timeInSeconds = ref(0);
  let timer: NodeJS.Timeout;

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeInSeconds.value / 60);
    const seconds = timeInSeconds.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  const startTimer = () => {
    timer = setInterval(() => {
      timeInSeconds.value++;
    }, 1000);
  };

  const resetTimer = () => {
    stopTimer()
    timeInSeconds.value = 0
    startTimer()
  }

  const stopTimer = () => {
    clearInterval(timer);
  };

  onBeforeUnmount(() => {
    stopTimer();
  });

  return {
    formattedTime,
    startTimer,
    resetTimer,
    stopTimer,
  }
}

