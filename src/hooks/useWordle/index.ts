import { useMemo, useState } from 'react'

export const useWordle = () => {
  const [wordToGuess, setWordToGuess] = useState<string | null>(null)
  const [wordsGuessed, setWordsGuessed] = useState<string[]>([])

  const wordLenght = useMemo(() => {
    return wordToGuess?.length ?? 0
  }, [wordToGuess])

  const startGame = () => {
    // TODO implement random word
    setWordToGuess('hello')
  }

  const guessWord = (word: string) => {
    setWordsGuessed([...wordsGuessed, word])
  }

  return {
    wordToGuess,
    wordsGuessed,
    wordLenght,
    startGame,
    guessWord
  }
}
