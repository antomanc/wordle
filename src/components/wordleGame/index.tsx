import { useWordle } from '@hooks/useWordle'
import { Box, Button, Grid, Input, Paper, useTheme } from '@mui/material'
import { createRef, useCallback, useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { toast } from 'react-toastify'

export const WordleGame = () => {
  const theme = useTheme()
  const {
    wordLenght,
    wordToGuess,
    wordsGuessed,
    canGuessWord,
    guessWord,
    startGame
  } = useWordle()
  const [letters, setLetters] = useState<string[]>([])
  const [focused, setFocused] = useState<{ row: number; cell: number } | null>(
    null
  )
  const [isGameWon, setIsGameWon] = useState(false)

  const emptyLetters: string[] = useMemo(
    () => Array.from({ length: wordLenght }).map(() => ''),
    [wordLenght]
  )

  useEffect(() => {
    if (!wordToGuess) {
      startGame()
    }
  }, [startGame, wordToGuess])

  const cellsRefs = useMemo(
    () =>
      Array.from({ length: 6 }).map(() =>
        Array.from({ length: wordLenght }).map(() =>
          createRef<HTMLInputElement>()
        )
      ),
    [wordLenght]
  )

  useEffect(() => {
    if (letters.length === 0) {
      setLetters(emptyLetters)
    }
  }, [emptyLetters, letters])

  const handleGuessWord = (word: string) => {
    if (!canGuessWord(word)) {
      return
    }
    const isCorrect = guessWord(word)
    setLetters(emptyLetters)
    if (!isCorrect) {
      if (wordsGuessed.length === 5) {
        toast(`The word was ${wordToGuess}`, {
          type: 'error'
        })
      }
      return
    }
    setIsGameWon(true)
    toast('You guessed the word!', {
      type: 'success'
    })
    confetti({
      gravity: 1,
      particleCount: 1000,
      spread: 90,
      startVelocity: 140,
      origin: { x: 0.5, y: 1.5 }
    })
  }

  useEffect(() => {
    if (!cellsRefs[0][0]?.current) return
    cellsRefs[0][0]?.current?.focus()
  }, [cellsRefs])

  useEffect(() => {
    if (wordsGuessed.length === 0) return
    if (!cellsRefs[wordsGuessed.length]?.[0]?.current) return
    cellsRefs[wordsGuessed.length][0]?.current?.focus()
  }, [cellsRefs, wordsGuessed])

  const handleRestartGame = useCallback(() => {
    startGame()
    setLetters(emptyLetters)
    setFocused(null)
    setIsGameWon(false)
  }, [emptyLetters, startGame])

  return wordToGuess && letters.length > 0 ? (
    <Box
      sx={{
        padding: { xs: 1, sm: 2, md: 3 },
        width: {
          xs: '100%',
          sm: '80%',
          md: wordLenght > 6 ? '80%' : '60%'
        }
      }}>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <Grid item xs={12} key={rowIndex}>
            <Grid container spacing={1} justifyContent="center">
              {Array.from({ length: wordLenght }).map((_, cellIndex) => (
                <Grid item xs={12 / wordLenght} key={cellIndex}>
                  <Paper
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '100%',
                      border: '2px solid',
                      borderColor:
                        focused?.row === rowIndex &&
                        focused?.cell === cellIndex &&
                        !isGameWon
                          ? theme.palette.primary.main
                          : theme.palette.divider,
                      backgroundColor:
                        wordsGuessed.length > rowIndex
                          ? wordsGuessed[rowIndex].letters[cellIndex]
                              .backgroundColor
                          : theme.palette.background.default
                    }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'transparent',
                        backgroundColor: 'transparent'
                      }}>
                      {wordsGuessed.length === rowIndex ? (
                        <Input
                          autoFocus={rowIndex === 0 && cellIndex === 0}
                          inputRef={cellsRefs[rowIndex][cellIndex]}
                          value={letters[cellIndex]}
                          disabled={
                            wordsGuessed.length !== rowIndex || isGameWon
                          }
                          onFocus={() =>
                            setFocused({ row: rowIndex, cell: cellIndex })
                          }
                          onBlur={() => setFocused(null)}
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setFocused({ row: rowIndex, cell: cellIndex })
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Backspace') {
                              const newLetters = [...letters]
                              if (newLetters[cellIndex] === '') {
                                newLetters[cellIndex - 1] = ''

                                if (cellIndex > 0) {
                                  cellsRefs[rowIndex][
                                    cellIndex - 1
                                  ]?.current?.focus()
                                }
                              } else {
                                newLetters[cellIndex] = ''
                              }
                              setLetters(newLetters)
                              return
                            }
                            if (e.key === 'ArrowLeft') {
                              if (cellIndex > 0) {
                                cellsRefs[rowIndex][
                                  cellIndex - 1
                                ]?.current?.focus()
                              }
                              return
                            }
                            if (e.key === 'ArrowRight') {
                              if (cellIndex < wordLenght - 1) {
                                cellsRefs[rowIndex][
                                  cellIndex + 1
                                ]?.current?.focus()
                              }
                              return
                            }
                            if (!e.key.match(/[a-zA-Z]/)) return
                            const newLetters = [...letters]
                            newLetters[cellIndex] = e.key
                              .toLocaleUpperCase()
                              .slice(-1)
                            setLetters(newLetters)

                            // check if the next cell exists
                            if (cellIndex < wordLenght - 1) {
                              cellsRefs[rowIndex][
                                cellIndex + 1
                              ]?.current?.focus()
                            } else {
                              handleGuessWord(newLetters.join(''))
                            }
                          }}
                          disableUnderline
                          type="text"
                          inputProps={{
                            style: {
                              textAlign: 'center',
                              caretColor: 'transparent',
                              backgroundColor: 'transparent'
                            }
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            border: 'none',
                            outline: 'none',
                            fontSize: '1.5rem',
                            backgroundColor: 'transparent'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            border: 'none',
                            outline: 'none',
                            fontSize: '1.5rem',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black'
                          }}>
                          {wordsGuessed[rowIndex]?.letters[cellIndex].value}
                        </div>
                      )}
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box mt={5} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleRestartGame}
          size="large">
          Restart
        </Button>
      </Box>
    </Box>
  ) : (
    <Box sx={{ padding: 2 }}>Loading...</Box>
  )
}
