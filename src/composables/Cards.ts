import { ref } from "vue"

export function useCards() {
  const cards = ref<number[]>([])

  function setCardsValue(newValue: number[]) {
    cards.value = newValue
  }

  function resetCards(): void {
    cards.value = []
  }

  function generatePairsOfCards(cardsNumber: number): number[] {
    let pairs: number[] = []

    for (let n = 1; n <= cardsNumber / 2; n++) {
      pairs.push(n, n)
    }

    return pairs
  }

  function shuffleCards(array: number[]): number[] {
    let currentIndex = array.length

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
  }

  return {
    cards,
    setCardsValue,
    resetCards,
    generatePairsOfCards,
    shuffleCards
  }
}