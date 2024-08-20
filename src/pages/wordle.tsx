import { MainLayout } from '@components/mainLayout'
import { WordleGame } from '@components/wordleGame'
import { Container } from '@mui/material'

export const WordlePage = () => {
  return (
    <MainLayout title="Wordle">
      <Container
        maxWidth="md"
        sx={{
          height: '80svh',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center'
        }}>
        <WordleGame />
      </Container>
    </MainLayout>
  )
}
