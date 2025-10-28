import { useQuestionsStore } from "../store/questions"


export const useQuestionData = () => {

    //llamamos las preguntas del store
    const preguntas = useQuestionsStore(state => state.preguntas);

    // inicializadores
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    // foreach para contabilizar las respuestas
    preguntas.forEach( p => {
        const {userSelectedAnswer, respuestaCorrecta} = p;

        if(userSelectedAnswer == null ) unanswered++;
        else if(userSelectedAnswer === respuestaCorrecta) correct++;
        else incorrect++;
    })
  return (
    {correct, incorrect, unanswered}
  )
}
