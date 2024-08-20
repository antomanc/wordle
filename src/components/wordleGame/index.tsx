import { useWordle } from '@hooks/useWordle'
import { Box, Grid, Paper } from '@mui/material'
import { useEffect } from 'react'

export const WordleGame = () => {
  const { wordLenght, startGame } = useWordle()

  useEffect(() => {
    startGame()
  }, [startGame])

  return (
    <Box
      width={{
        md: '35%',
        sm: '50%',
        xs: '100%'
      }}>
      {' '}
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={1} justifyContent="center">
              {Array.from({ length: wordLenght }).map((_, index) => (
                <Grid item xs={2} key={index}>
                  <Paper
                    style={{
                      width: '100%',
                      paddingTop: '100%',
                      border: '1px  #000'
                    }}>
                    <div style={{ height: '100%' }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
