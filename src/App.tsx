
import './App.css'
import { Container, Stack } from '@mui/material'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game';
import { useEffect } from 'react';

function App() {

  const preguntas = useQuestionsStore(state => state.preguntas);
  const reset = useQuestionsStore(state => state.reset)

  console.log(preguntas);

  useEffect(() => {
    reset();
  }, []); 

  return (
    <main className='mt-5'>
      <Container maxWidth='sm' >
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center' >
          <img src="/image.png" alt="quiz" className='w-24 h-24 rounded-full' />
          <h1 className='quiz text-3xl text-white font-bold text-center w-[300px]'>
            Cerebro en juego!
          </h1>
        </Stack>
         
        {preguntas.length === 0 ? <Start/> : <Game/>}

      </Container>
    </main>
  )
}

export default App
