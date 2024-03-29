
import flipCardFile from '../assets/sounds/flip-card.wav'
import downFaceFlipCardFile from '../assets/sounds/flip-downface.wav'
import pairedCardsFile from '../assets/sounds/paired.wav'

export function useSound() {
  const flipCardSound = new Audio(flipCardFile)
  const downFaceFlipCardSound = new Audio(downFaceFlipCardFile)
  const pairedSound = new Audio(pairedCardsFile)

  const playFlipCard = () => {
    flipCardSound.volume = 0.5;
    flipCardSound.play()
  };

  const playDownFaceFlipCard = () => {
    downFaceFlipCardSound.volume = 0.5;
    downFaceFlipCardSound.play()
  };

  const playPairedCards = () => {
    pairedSound.volume = 0.5;
    pairedSound.play()
  }

  return {
    flipCardSound,
    downFaceFlipCardSound,
    playFlipCard,
    playDownFaceFlipCard,
    playPairedCards
  }
}

