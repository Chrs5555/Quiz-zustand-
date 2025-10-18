
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    // mode: 'light',
    background: { default: '#2D3A70'},
  }
})

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <App />
  </ThemeProvider>,
)
