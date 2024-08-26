import { useTheme } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'

//json are in this format
//[
// 1: [...],
// 2: [...],
//]
import itWords from '@assets/it.json'
import enWords from '@assets/en.json'
import { toast } from 'react-toastify'

interface Letter {
  value: string
  isCorrect: boolean
  backgroundColor: string
}

interface Word {
  letters: Letter[]
}

export enum LanguagesAvailableEnum {
  it = 'it',
  en = 'en'
}

export type LanguagesAvailable = LanguagesAvailableEnum

export const languagesLabels: Record<LanguagesAvailable, string> = {
  it: 'Italiano',
  en: 'English'
}

const getJsonWords = (
  language: LanguagesAvailable
): Record<number, string[]> => {
  switch (language) {
    case 'it':
      return itWords
    case 'en':
      return enWords
  }

  // default to english
  return enWords
}

const getRandomWord = (length: number, language: LanguagesAvailable) => {
  const words = getJsonWords(language)[length]
  return words[Math.floor(Math.random() * words.length)].toUpperCase()
}

export const useWordle = () => {
  const theme = useTheme()
  const [wordToGuess, setWordToGuess] = useState<string | null>(null)
  const [wordsGuessed, setWordsGuessed] = useState<Word[]>([])
  const [preferredWordLength, setCachedPreferredWordLength] =
    useState<number>(5)
  const [preferredLanguage, setCahedPreferredLanguage] =
    useState<LanguagesAvailable>(LanguagesAvailableEnum.en)

  useEffect(() => {
    const handleStorageChange = () => {
      const retrievedPreferredWordLength = localStorage.getItem(
        'preferredWordLength'
      )
      const retrievedPreferredLanguage =
        localStorage.getItem('preferredLanguage')
      if (retrievedPreferredWordLength)
        setCachedPreferredWordLength(Number(retrievedPreferredWordLength))
      if (retrievedPreferredLanguage)
        setCahedPreferredLanguage(
          retrievedPreferredLanguage as LanguagesAvailable
        )
    }

    handleStorageChange()

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const setPreferredWordLength = useCallback(
    (length: number) => {
      localStorage.setItem('preferredWordLength', length.toString())
      setCachedPreferredWordLength(length)
      window.dispatchEvent(new Event('storage'))
    },
    [setCachedPreferredWordLength]
  )

  const setPreferredLanguage = useCallback(
    (language: LanguagesAvailable) => {
      localStorage.setItem('preferredLanguage', language)
      setCahedPreferredLanguage(language)
      window.dispatchEvent(new Event('storage'))
    },
    [setCahedPreferredLanguage]
  )

  const wordLenght = useMemo(() => {
    return wordToGuess?.length ?? 0
  }, [wordToGuess])

  const startGame = useCallback(() => {
    const language = preferredLanguage
    const length = preferredWordLength
    let newWord
    try {
      newWord = getRandomWord(length, language)
    } catch {
      toast.error('No words found for this length, using length 5', {
        type: 'error'
      })
      newWord = getRandomWord(5, language)
    }
    setWordsGuessed([])
    setWordToGuess(newWord)
  }, [preferredWordLength, preferredLanguage])

  const getWordBackgroundColor = useCallback(
    (word: string, correctWord: string): Word => {
      const red = theme.palette.error.main
      const green = theme.palette.success.main
      const yellow = theme.palette.warning.main
      const defaultColor = theme.palette.background.default

      const correctWordArr = correctWord.split('')
      const wordArr = word.split('')

      const letterStatus = wordArr.map(letter => ({
        value: letter,
        isCorrect: false,
        backgroundColor: defaultColor
      }))

      const correctWordLetterCount: Record<string, number> = {}

      correctWordArr.forEach(letter => {
        correctWordLetterCount[letter] =
          (correctWordLetterCount[letter] || 0) + 1
      })

      wordArr.forEach((letter, index) => {
        if (letter === correctWordArr[index]) {
          letterStatus[index].backgroundColor = green
          letterStatus[index].isCorrect = true
          correctWordLetterCount[letter] -= 1
        }
      })

      wordArr.forEach((letter, index) => {
        if (
          letter !== correctWordArr[index] &&
          correctWordLetterCount[letter] > 0
        ) {
          letterStatus[index].backgroundColor = yellow
          correctWordLetterCount[letter] -= 1
        } else if (!letterStatus[index].isCorrect) {
          letterStatus[index].backgroundColor = red
        }
      })

      return {
        letters: letterStatus
      }
    },
    [
      theme.palette.background.default,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ]
  )

  const guessWord = useCallback(
    (word: string) => {
      if (word.length !== wordLenght) return false
      if (!wordToGuess) return false

      const newWordsGuessed = [
        ...wordsGuessed,
        getWordBackgroundColor(word, wordToGuess)
      ]

      setWordsGuessed(newWordsGuessed)

      return word === wordToGuess
    },
    [getWordBackgroundColor, wordLenght, wordToGuess, wordsGuessed]
  )

  return {
    wordToGuess,
    wordsGuessed,
    wordLenght,
    preferredWordLength,
    setPreferredWordLength,
    preferredLanguage,
    setPreferredLanguage,
    startGame,
    guessWord
  }
}
