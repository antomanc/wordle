import { CustomThemeProvider } from '@components/customThemeProvider'
import { WordlePage } from '@pages/wordle'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <>
        <ToastContainer autoClose={4000} position="top-center" />
        <WordlePage />
      </>
    </CustomThemeProvider>
  </StrictMode>
)
